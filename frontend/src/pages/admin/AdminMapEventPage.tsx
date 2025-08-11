import { useState, useEffect, useRef, useLayoutEffect } from "react";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  getAllMapEvents,
  addMapEvent,
  updateMapEvent,
  deleteMapEvent,
} from "../../services/mapEvent";
import { getAllCategories } from "../../services/category";
import type { Category } from "../../types/category";
import type { MapEvent } from "../../types/mapEvent";
import {
  FormField,
  ActionButtons,
  SubmitButton,
} from "../../components/admin/FormComponents";
import {
  showSuccessToast,
  createErrorHandler,
} from "../../components/admin/utils";
import { MESSAGES, CSS_CLASSES } from "../../components/admin/constants";

export default function AdminMapEventPage() {
  const [events, setEvents] = useState<MapEvent[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingEvent, setEditingEvent] = useState<MapEvent | null>(null);
  // Адаптивний розмір мапи та квіточок
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapWidth, setMapWidth] = useState(600);
  useLayoutEffect(() => {
    function updateSize() {
      if (mapRef.current) setMapWidth(mapRef.current.offsetWidth);
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  const flowerSize = Math.round(mapWidth / 25); // 24px при 600px, 40px при 1000px

  useEffect(() => {
    fetchEvents();
    getAllCategories().then(setCategories);
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getAllMapEvents();
      setEvents(data);
    } catch (error) {
      createErrorHandler(MESSAGES.ERROR.LOAD_EVENTS)(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMapEvent(id);
      showSuccessToast("Подію видалено");
      fetchEvents();
    } catch (error) {
      createErrorHandler("Не вдалося видалити подію")(error);
    }
  };

  const initialValues = {
    x: 50,
    y: 50,
    category: "",
    title: "",
    zIndex: 1,
  };

  const validationSchema = Yup.object({
    x: Yup.number().min(0).max(100).required("X (відсотки) обов'язково"),
    y: Yup.number().min(0).max(100).required("Y (відсотки) обов'язково"),
    category: Yup.string().required("Оберіть категорію"),
    title: Yup.string().required("Введіть назву події"),
    zIndex: Yup.number().min(1).max(10).required("Оберіть шар (z-index)"),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: import("formik").FormikHelpers<typeof initialValues>
  ) => {
    try {
      if (editingEvent) {
        await updateMapEvent(editingEvent._id, values);
        showSuccessToast("Подію оновлено");
      } else {
        await addMapEvent(values);
        showSuccessToast("Подію додано");
      }
      fetchEvents();
      resetForm();
      setEditingEvent(null);
    } catch (error) {
      createErrorHandler("Не вдалося зберегти подію")(error);
    }
  };

  const [mapClick, setMapClick] = useState<{ x: number; y: number } | null>(
    null
  );
  const [setFieldValueRef, setSetFieldValueRef] = useState<
    ((field: string, value: number) => void) | null
  >(null);

  // Обробник кліку по мапі
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!setFieldValueRef) return;
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMapClick({ x, y });
    setFieldValueRef("x", Math.round(x * 100) / 100);
    setFieldValueRef("y", Math.round(y * 100) / 100);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Керування подіями на мапі</h1>
      <div className="mb-8 flex flex-col md:flex-row gap-8">
        <div
          ref={mapRef}
          style={{
            position: "relative",
            width: 600,
            height: 400,
            background: "#e3e7ef",
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid #bbb",
            maxWidth: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              left: 0,
              top: 0,
              zIndex: 1,
              cursor: "crosshair",
            }}
            onClick={handleMapClick}
          >
            <img
              src="/garden-map.png"
              alt="map"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                pointerEvents: "none",
              }}
            />

            {events.map((ev) => {
              const half = flowerSize / 2;
              return (
                <img
                  key={ev._id}
                  src={ev.miniatureImage}
                  alt="miniature"
                  style={{
                    position: "absolute",
                    left: `calc(${ev.x}% - ${half}px)`,
                    top: `calc(${ev.y}% - ${half}px)`,
                    width: flowerSize,
                    height: flowerSize,
                    zIndex: ev.zIndex || 1,
                    filter:
                      editingEvent?._id === ev._id
                        ? "drop-shadow(0 0 8px #ff0)"
                        : "none",
                    transition: "box-shadow 0.2s",
                    pointerEvents: "none",
                  }}
                />
              );
            })}

            {mapClick && !editingEvent && (
              <div
                style={{
                  position: "absolute",
                  left: `calc(${mapClick.x}% - ${flowerSize / 2}px)`,
                  top: `calc(${mapClick.y}% - ${flowerSize / 2}px)`,
                  width: flowerSize,
                  height: flowerSize,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.1)",
                  border: "2px dashed #333",
                  zIndex: 20,
                  pointerEvents: "none",
                }}
              />
            )}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 320 }}>
          <Formik
            initialValues={
              editingEvent
                ? {
                    x: editingEvent.x,
                    y: editingEvent.y,
                    category:
                      typeof editingEvent.category === "object"
                        ? editingEvent.category._id
                        : editingEvent.category,
                    title: editingEvent.title,
                    zIndex: editingEvent.zIndex || 1,
                  }
                : {
                    ...initialValues,
                    ...(mapClick ? { x: mapClick.x, y: mapClick.y } : {}),
                  }
            }
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps) => {
              // setFieldValue для інтерактивної мапи
              if (setFieldValueRef !== formikProps.setFieldValue) {
                setSetFieldValueRef(() => formikProps.setFieldValue);
              }
              return (
                <Form className="mb-6">
                  <FormField name="title" label="Назва події" type="text" />
                  <div className="flex gap-2">
                    <FormField name="x" label="X (відсотки)" type="number" />
                    <FormField name="y" label="Y (відсотки)" type="number" />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1 font-medium">Категорія</label>
                    <select
                      name="category"
                      value={formikProps.values.category}
                      onChange={(e) =>
                        formikProps.setFieldValue("category", e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="">Оберіть категорію</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1 font-medium">
                      Шар (z-index)
                    </label>
                    <select
                      name="zIndex"
                      value={formikProps.values.zIndex}
                      onChange={(e) =>
                        formikProps.setFieldValue(
                          "zIndex",
                          Number(e.target.value)
                        )
                      }
                      className="border rounded px-2 py-1"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage
                      name="zIndex"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <SubmitButton isEditing={!!editingEvent} />
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      <div>
        {events.map((event) => (
          <div key={event._id} className={CSS_CLASSES.CARD}>
            <div className="flex flex-col gap-1">
              <span>
                <b>Назва:</b> {event.title}
              </span>
              <span>
                <b>Категорія:</b>{" "}
                {typeof event.category === "object"
                  ? event.category.name
                  : event.category}
              </span>
              <span>
                <b>Координати:</b> X: {event.x}, Y: {event.y}
              </span>
              <span>
                <b>Шар (z-index):</b> {event.zIndex}
              </span>
              {event.miniatureImage && (
                <span>
                  <b>Мініатюра:</b>{" "}
                  <img
                    src={event.miniatureImage}
                    alt="miniature"
                    style={{
                      maxWidth: 40,
                      maxHeight: 40,
                      display: "inline-block",
                      verticalAlign: "middle",
                    }}
                  />
                </span>
              )}
            </div>
            <ActionButtons
              onEdit={() => setEditingEvent(event)}
              onDelete={() => handleDelete(event._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
