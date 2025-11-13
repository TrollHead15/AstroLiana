import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Главная",
  description:
    "Получайте бесплатные астрологические материалы и запишитесь на консультацию у Лианы Астро.",
  alternates: {
    canonical: "/"
  }
};

export default function HomePage() {
  return (
    <div className="page-shell">
      <header>
        <h1>Лиана Астро</h1>
        <p>
          Добро пожаловать! Здесь вы можете получить бесплатные материалы по астрологии и записаться
          на персональные консультации.
        </p>
      </header>
      <section>
        <h2>Юридические документы</h2>
        <p>
          Перед использованием материалов и форм обратной связи пожалуйста ознакомьтесь с Политикой
          конфиденциальности и Согласием на обработку персональных данных.
        </p>
        <ul>
          <li>
            <Link href="/privacy-policy">Политика конфиденциальности</Link>
          </li>
          <li>
            <Link href="/consent">Согласие на обработку персональных данных</Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
