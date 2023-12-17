import React, { useState, useEffect, useRef } from "react";
import styles from "./ReportPopup.module.scss";
import { Modal, Form, Button, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { SendReportData } from "../../../apis/DefaultAPI";

export default function ReportPopup({ show, onHide, stickerSetId }) {
  const { t } = useTranslation();
  const [data, setData] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    SendReportData(stickerSetId, data);
    setSubmitted(true);
    setTimeout(() => {
      onHide();
      setData("");
      setSubmitted(false);
    }, 1000);
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className={styles.modal}>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Col} md="12">
            <Form.Label>{t("Please describe the problem:")}</Form.Label>
            <Form.Control
              as="textarea"
              rows="6"
              required
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </Form.Group>
          <Col
            className={
              styles.submitButton + " " + (submitted ? styles.submitted : "")
            }
          >
            <Button variant="success" type="submit">
              {t("Submit")}
            </Button>
            {submitted && (
              <div class={styles.wrapper}>
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 98.5 98.5"
                  enableBackground="new 0 0 98.5 98.5"
                  xmlSpace="preserve"
                >
                  <path
                    class={styles.checkmark}
                    fill="none"
                    strokeWidth="8"
                    strokeMiterlimit="10"
                    d="M81.7,17.8C73.5,9.3,62,4,49.2,4
	C24.3,4,4,24.3,4,49.2s20.3,45.2,45.2,45.2s45.2-20.3,45.2-45.2c0-8.6-2.4-16.6-6.5-23.4l0,0L45.6,68.2L24.7,47.3"
                  />
                </svg>
              </div>
            )}
          </Col>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
