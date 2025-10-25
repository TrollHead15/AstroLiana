import * as React from "react";

interface GuideEmailProps {
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

const GuideEmail = ({ name }: GuideEmailProps) => (
  <div style={containerStyles}>
    <div style={cardStyles}>
      <h1 style={{
        ...baseStyles,
        margin: "0 0 16px",
        fontSize: "24px",
        fontWeight: 600,
        color: "#2d2b55",
      }}>
        {name ? `${name}, ваш гайд уже здесь!` : "Ваш гайд уже здесь!"}
      </h1>
      <p style={{ margin: "0 0 12px" }}>
        Делюсь PDF «3 триггера в отношениях». Внутри — разбор паттернов на базе
        Венеры и Марса и практики, которые помогают их трансформировать.
      </p>
      <p style={{ margin: "0 0 12px" }}>
        Скачайте файл из вложения, уделите спокойные 20 минут на чтение и
        сохраните заметки. Эти наблюдения пригодятся для дальнейшей работы с
        натальной картой.
      </p>
      <p style={{ margin: "0 0 12px" }}>
        Если захочется разобрать ваши ситуации глубже — просто ответьте на это
        письмо.
      </p>
      <p style={{ margin: "24px 0 0", fontWeight: 600 }}>
        До связи,
        <br />
        Лиана Астро
      </p>
    </div>
  </div>
);

export default GuideEmail;
