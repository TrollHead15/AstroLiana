import * as React from "react";

interface ChecklistEmailProps {
  name: string;
}

const baseStyles: React.CSSProperties = {
  fontFamily: '"Inter", Arial, sans-serif',
  color: "#1d1c2d",
};

const containerStyles: React.CSSProperties = {
  ...baseStyles,
  backgroundColor: "#f9f6ee",
  padding: "32px",
};

const cardStyles: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "32px",
  boxShadow: "0 12px 45px rgba(45, 43, 85, 0.12)",
  lineHeight: 1.6,
};

const ChecklistEmail = ({ name }: ChecklistEmailProps) => (
  <div style={containerStyles}>
    <div style={cardStyles}>
      <h1 style={{
        ...baseStyles,
        margin: "0 0 16px",
        fontSize: "24px",
        fontWeight: 600,
        color: "#2d2b55",
      }}>
        Привет, {name || "друг"}!
      </h1>
      <p style={{ margin: "0 0 12px" }}>
        Благодарю за интерес к чек-листу «Лунный знак за 5 минут». Я подготовила
        PDF, который поможет быстро разобраться, как ваш Лунный знак влияет на
        эмоции, отношения и стиль общения.
      </p>
      <p style={{ margin: "0 0 12px" }}>
        Чек-лист уже прикреплён к этому письму. Сохраняйте его себе, проходите
        шаги и отмечайте инсайты.
      </p>
      <p style={{ margin: "0 0 12px" }}>
        Если появятся вопросы — смело отвечайте на это письмо, буду рада помочь.
      </p>
      <p style={{ margin: "24px 0 0", fontWeight: 600 }}>
        С теплом,
        <br />
        Лиана Астро
      </p>
    </div>
  </div>
);

export default ChecklistEmail;
