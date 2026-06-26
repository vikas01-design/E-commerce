const SectionTitle = ({ title, underlineColor = '#d63384' }) => {
  return (
    <div style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{
        fontSize: 'clamp(1.7rem, 3.5vw, 2.2rem)',
        fontWeight: 600,
        letterSpacing: '0.01em',
        marginBottom: '10px',
        color: 'var(--text-main)',
        fontFamily: '"Playfair Display", serif',
      }}>
        {title}
      </h2>
      {/* Pure CSS transition — no inline style mutation */}
      <div
        className="section-title-underline"
        style={{ '--underline-color': underlineColor }}
      />

      <style>{`
        .section-title-underline {
          width: 52px;
          height: 3px;
          background: var(--underline-color, #d63384);
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        .section-title-underline:hover {
          width: 90px;
        }
      `}</style>
    </div>
  );
};

export default SectionTitle;
