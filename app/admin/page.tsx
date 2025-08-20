export default function AdminPage() {
  return (
    <div className="section">
      <h1 style={{marginBottom: 16}}>Yönetim</h1>
      <div className="grid">
        <a className="card" style={{gridColumn: 'span 4', padding: 16}} href="#">İçerik</a>
        <a className="card" style={{gridColumn: 'span 4', padding: 16}} href="#">TDC-BIST</a>
        <a className="card" style={{gridColumn: 'span 4', padding: 16}} href="#">İndirim & Kupon</a>
        <a className="card" style={{gridColumn: 'span 4', padding: 16}} href="#">Siparişler</a>
        <a className="card" style={{gridColumn: 'span 4', padding: 16}} href="#">Finans</a>
        <a className="card" style={{gridColumn: 'span 4', padding: 16}} href="#">URL’den İçe Aktar</a>
      </div>
    </div>
  )
}