import Link from "next/link";

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-links">
          <Link href="/privacy-policy">Политика конфиденциальности</Link>
          <Link href="/consent">Согласие на обработку ПД</Link>
        </div>
        <span>© {currentYear} Лиана Астро. Все права защищены.</span>
      </div>
    </footer>
  );
}

export default Footer;
