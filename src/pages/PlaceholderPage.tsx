function PlaceholderPage({ title }: { title: string }) {
  return (
    <section className="content">
      <h1 className="section-title">{title}</h1>
      <p style={{ color: '#6c757d' }}>Cette page est en cours de construction.</p>
    </section>
  )
}

export default PlaceholderPage