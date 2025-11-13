import type { Metadata } from "next";
import Link from "next/link";

import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных",
  description:
    "Согласие на обработку персональных данных для получения материалов и консультаций от Лианы Астро.",
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "/consent"
  }
};

export default function ConsentPage() {
  return (
    <div className="page-shell">
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Согласие на обработку ПД" }]} />
      <Link className="back-link" href="/">
        ← Назад на главную
      </Link>
      <div className="legal-content">
        <header>
          <h1>Согласие на обработку персональных данных</h1>
        </header>
        <section>
          <p>
            Я даю согласие на обработку моих персональных данных (ФИО, email, дата, время и место рождения) в целях
            получения бесплатных материалов и информации о консультациях от Лианы Астро.
          </p>
        </section>
        <section>
          <p>Обработка персональных данных осуществляется в соответствии с Политикой конфиденциальности.</p>
        </section>
        <section>
          <p>Я могу отозвать согласие в любой момент, написав на <a href="mailto:hello@lianaastro.ru">hello@lianaastro.ru</a>.</p>
        </section>
      </div>
    </div>
  );
}
