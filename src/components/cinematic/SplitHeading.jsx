import { motion } from 'framer-motion';

/**
 * SplitHeading — animates heading text on scroll
 *
 * mode="chars"  → each character flies in individually
 * mode="words"  → each word slides up
 * mode="lines"  → each line element slides up (pass children as array)
 * mode="reveal" → text is masked and wipes in left-to-right
 * mode="glitch" → text flickers in with a crimson ghost offset
 */

const CHAR_VARIANTS = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.028,
    },
  }),
};

const WORD_VARIANTS = {
  hidden: { y: 40, opacity: 0, skewY: 4 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    skewY: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.07,
    },
  }),
};

const LINE_VARIANTS = {
  hidden: { y: 56, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.12,
    },
  }),
};

const REVEAL_CONTAINER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const GLITCH_VARIANTS = {
  hidden: { opacity: 0, x: -12, filter: 'blur(8px)' },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.05,
    },
  }),
};

export default function SplitHeading({
  as: Tag = 'h2',
  text,
  mode = 'words',
  className = '',
  style = {},
  once = true,
  amount = 0.3,
}) {
  const viewportOpts = { once, amount };

  /* ── CHARS mode ── */
  if (mode === 'chars') {
    const chars = text.split('');
    return (
      <Tag className={className} style={{ ...style, overflow: 'hidden', display: 'block' }}>
        <motion.span
          style={{ display: 'inline-flex', flexWrap: 'wrap' }}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOpts}
        >
          {chars.map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={CHAR_VARIANTS}
              style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : undefined }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      </Tag>
    );
  }

  /* ── WORDS mode ── */
  if (mode === 'words') {
    const words = text.split(' ');
    return (
      <Tag className={className} style={{ ...style, overflow: 'hidden' }}>
        <span style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25em' }}>
          {words.map((word, i) => (
            <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
              <motion.span
                custom={i}
                variants={WORD_VARIANTS}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOpts}
                style={{ display: 'inline-block' }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </span>
      </Tag>
    );
  }

  /* ── LINES mode (children = array of strings) ── */
  if (mode === 'lines') {
    const lines = Array.isArray(text) ? text : [text];
    return (
      <Tag className={className} style={style}>
        {lines.map((line, i) => (
          <span key={i} style={{ overflow: 'hidden', display: 'block' }}>
            <motion.span
              custom={i}
              variants={LINE_VARIANTS}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOpts}
              style={{ display: 'block' }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </Tag>
    );
  }

  /* ── REVEAL mode — left-to-right clip wipe ── */
  if (mode === 'reveal') {
    return (
      <Tag className={className} style={{ position: 'relative', ...style }}>
        {/* Ghost text (invisible spacer) */}
        <span style={{ opacity: 0, userSelect: 'none', display: 'block' }}>{text}</span>
        {/* Animated wipe */}
        <motion.span
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
          viewport={viewportOpts}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'block',
          }}
        >
          {text}
        </motion.span>
      </Tag>
    );
  }

  /* ── GLITCH mode — words flicker in with crimson ghost ── */
  if (mode === 'glitch') {
    const words = text.split(' ');
    return (
      <Tag className={className} style={{ ...style, position: 'relative' }}>
        {/* Crimson ghost layer */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            color: 'var(--cin-crimson)',
            opacity: 0.18,
            transform: 'translate(3px, -2px)',
            pointerEvents: 'none',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.25em',
          }}
        >
          {words.map((w, i) => <span key={i}>{w}</span>)}
        </span>
        {/* Actual text */}
        <span style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25em', position: 'relative' }}>
          {words.map((word, i) => (
            <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
              <motion.span
                custom={i}
                variants={GLITCH_VARIANTS}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOpts}
                style={{ display: 'inline-block' }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </span>
      </Tag>
    );
  }

  return <Tag className={className} style={style}>{text}</Tag>;
}
