export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '24px 60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'var(--bg2)',
      }}
    >
      <span className="footer-copy">© 2025 Khitab Anand</span>
      <span className="footer-copy">Designed + Coded by Khitab</span>
    </footer>
  );
}
