export default function ContactPage() {
  return (
    <div className="section">
      <h1 style={{marginBottom: 16}}>İletişim</h1>
      <div className="grid" style={{alignItems: 'start'}}>
        <div style={{gridColumn: 'span 6'}}>
          <form style={{display: 'grid', gap: 12}} aria-label="İletişim Formu">
            <label>
              <span className="muted">Ad Soyad</span>
              <input required style={{width: '100%', height: 44, borderRadius: 10, border: '1px solid var(--color-border)', padding: '0 12px'}} />
            </label>
            <label>
              <span className="muted">E-posta</span>
              <input type="email" required style={{width: '100%', height: 44, borderRadius: 10, border: '1px solid var(--color-border)', padding: '0 12px'}} />
            </label>
            <label>
              <span className="muted">Konu</span>
              <input style={{width: '100%', height: 44, borderRadius: 10, border: '1px solid var(--color-border)', padding: '0 12px'}} />
            </label>
            <label>
              <span className="muted">Mesaj</span>
              <textarea rows={6} style={{width: '100%', borderRadius: 10, border: '1px solid var(--color-border)', padding: 12}} />
            </label>
            <button className="btn btn-primary" type="submit">Gönder</button>
          </form>
        </div>
        <div style={{gridColumn: 'span 6'}}>
          <div className="card" style={{padding: 16}}>
            <h3>İletişim Bilgileri</h3>
            <p>Telefon: 05558988242</p>
            <p>E-posta: bentahasarii@gmail.com</p>
            <p>Adres: Erzene, 66. Sk. No:5 D:1A, 35040 Bornova/İzmir</p>
          </div>
        </div>
      </div>
    </div>
  )
}
