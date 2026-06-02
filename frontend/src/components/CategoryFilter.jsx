'use client';

export default function CategoryFilter({ categories, activeCategory, onSelectCategory }) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.75rem',
      justifyContent: 'center',
      marginBottom: '3rem'
    }}>
      <button
        onClick={() => onSelectCategory('')}
        className={`btn ${activeCategory === '' ? 'btn-soft active' : 'btn-soft'}`}
        style={{
          padding: '0.5rem 1.25rem',
          fontSize: '0.85rem',
          borderRadius: '9999px',
          fontFamily: 'var(--font-label)',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          transition: 'all 0.3s ease',
          background: activeCategory === '' ? 'var(--color-dusty-rose)' : 'var(--color-cream)',
          color: activeCategory === '' ? 'var(--color-cream)' : 'var(--color-plum)',
          border: 'none',
          boxShadow: activeCategory === '' ? 'var(--shadow-warm)' : 'none'
        }}
      >
        All
      </button>

      {Array.isArray(categories) && categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`btn ${activeCategory === category ? 'btn-soft active' : 'btn-soft'}`}
          style={{
            padding: '0.5rem 1.25rem',
            fontSize: '0.85rem',
            borderRadius: '9999px',
            fontFamily: 'var(--font-label)',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            transition: 'all 0.3s ease',
            background: activeCategory === category ? 'var(--color-dusty-rose)' : 'var(--color-cream)',
            color: activeCategory === category ? 'var(--color-cream)' : 'var(--color-plum)',
            border: 'none',
            boxShadow: activeCategory === category ? 'var(--shadow-warm)' : 'none'
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
