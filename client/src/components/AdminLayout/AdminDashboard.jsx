// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const getStatusColor = (status) => {
//   switch (status?.toLowerCase()) {
//     case 'pending': return '#ffd700';
//     case 'matched': return '#4caf50';
//     case 'completed': return '#2196f3';
//     case 'cancelled': return '#f44336';
//     default: return '#9e9e9e';
//   }
// };

// export default function AdminDashboard() {
//   const [donors, setDonors] = useState([]);
//   const [recipients, setRecipients] = useState([]);
//   const [bloodRequests, setBloodRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeDetail, setActiveDetail] = useState(null); // { type: 'donor'|'recipient'|'request', item }
//   const [search, setSearch] = useState('');

//   useEffect(() => {
//     AOS.init({ duration: 600, once: true });
//   }, []);

//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         setLoading(true);
//         const stored = (() => {
//           try { return JSON.parse(localStorage.getItem('userInfo') || 'null'); } catch { return null; }
//         })();
//         const token = stored?.token || localStorage.getItem('adminToken') || null;
//         const opts = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

//         const [donorsRes, recipsRes, requestsRes] = await Promise.all([
//           axios.get('http://localhost:8000/api/admin/donors', opts),
//           axios.get('http://localhost:8000/api/admin/recipients', opts),
//           axios.get('http://localhost:8000/api/requests/allrqt', opts),
//         ]);

//         setDonors(donorsRes.data || []);
//         setRecipients(recipsRes.data || []);
//         setBloodRequests(requestsRes.data || []);
//         setError(null);
//       } catch (err) {
//         console.error('Failed to load admin data', err?.response || err);
//         setError(err?.response?.data?.message || err.message || 'Failed to load data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAll();
//   }, []);

//   const filtered = (list) => {
//     if (!search) return list;
//     const s = search.toLowerCase();
//     return list.filter(i => (i.name || '').toLowerCase().includes(s) || (i.email || '').toLowerCase().includes(s) || (i.location || '').toLowerCase().includes(s));
//   };

//   const openDetail = (type, item) => setActiveDetail({ type, item });
//   const closeDetail = () => setActiveDetail(null);

//   if (loading) return <div style={{ padding: 30 }}>Loading admin dashboard...</div>;
//   if (error) return <div style={{ padding: 30, color: 'crimson' }}>Error: {error}</div>;

//   return (
//     <div style={styles.page}>
//       <div style={styles.header} data-aos="fade-down">
//         <h1 style={styles.title}>Admin Dashboard</h1>
//         <p style={styles.subtitle}>Overview of donors and recipients</p>
//         <div style={styles.searchWrap}>
//           <input placeholder="Search by name, email, location..." value={search} onChange={e => setSearch(e.target.value)} style={styles.search} />
//         </div>
//       </div>

//       <section style={styles.section} data-aos="fade-up">
//         <h2 style={styles.sectionTitle}>Donors ({filtered(donors).length})</h2>
//         <div style={styles.grid}>
//           {filtered(donors).map(d => (
//             <div key={d._id} style={styles.card} onClick={() => openDetail('donor', d)}>
//               <div style={styles.cardHeader}>
//                 <div style={styles.avatar}>{d.name?.[0] || 'D'}</div>
//                 <div>
//                   <div style={styles.cardName}>{d.name}</div>
//                   <div style={styles.cardSub}>{d.bloodGroup || 'N/A' } • {d.location || '—'}</div>
//                 </div>
//               </div>
//               <div style={styles.cardBody}>
//                 <div style={styles.infoRow}><strong>Email:</strong> {d.email}</div>
//                 {d.phone && <div style={styles.infoRow}><strong>Phone:</strong> {d.phone}</div>}
//                 {(d.latitude || d.longitude) && <div style={styles.infoRow}><strong>Coords:</strong> {d.latitude || '—'}, {d.longitude || '—'}</div>}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section style={styles.section} data-aos="fade-up">
//         <h2 style={styles.sectionTitle}>Recipients ({filtered(recipients).length})</h2>
//         <div style={styles.grid}>
//           {filtered(recipients).map(r => (
//             <div key={r._id} style={styles.card} onClick={() => openDetail('recipient', r)}>
//               <div style={styles.cardHeader}>
//                 <div style={styles.avatar}>{r.name?.[0] || 'R'}</div>
//                 <div>
//                   <div style={styles.cardName}>{r.name}</div>
//                   <div style={styles.cardSub}>{r.requiredBloodGroup || 'N/A'} • {r.location || '—'}</div>
//                 </div>
//               </div>
//               <div style={styles.cardBody}>
//                 <div style={styles.infoRow}><strong>Email:</strong> {r.email}</div>
//                 {r.phone && <div style={styles.infoRow}><strong>Phone:</strong> {r.phone}</div>}
//                 {(r.latitude || r.longitude) && <div style={styles.infoRow}><strong>Coords:</strong> {r.latitude || '—'}, {r.longitude || '—'}</div>}
//                 <div style={styles.infoRow}><strong>Urgency:</strong> {r.urgency || 'Medium'}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section style={styles.section} data-aos="fade-up">
//         <h2 style={styles.sectionTitle}>Blood Requests ({filtered(bloodRequests).length})</h2>
//         <div style={styles.grid}>
//           {filtered(bloodRequests).map(req => (
//             <div key={req._id} style={styles.card} onClick={() => openDetail('request', req)}>
//               <div style={styles.cardHeader}>
//                 <div style={styles.avatar} style={{ background: getStatusColor(req.status) }}>{req.status?.[0]?.toUpperCase() || 'P'}</div>
//                 <div>
//                   <div style={styles.cardName}>
//                     {req.bloodGroup} Required
//                     <span style={{ marginLeft: 8, fontSize: 12, color: getStatusColor(req.status) }}>
//                       {req.status?.toUpperCase()}
//                     </span>
//                   </div>
//                   <div style={styles.cardSub}>
//                     {req.recipient?.name || 'Unknown Recipient'} • {req.location || '—'}
//                   </div>
//                 </div>
//               </div>
//               <div style={styles.cardBody}>
//                 <div style={styles.infoRow}><strong>Urgency:</strong> {req.urgency || 'Medium'}</div>
//                 {req.donor && (
//                   <div style={styles.infoRow}>
//                     <strong>Donor:</strong> {req.donor.name} ({req.donor.bloodGroup})
//                   </div>
//                 )}
//                 <div style={styles.infoRow}>
//                   <strong>Created:</strong> {new Date(req.createdAt).toLocaleDateString()}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {activeDetail && (
//         <div style={styles.modalOverlay} onClick={closeDetail}>
//           <div style={styles.modal} onClick={e => e.stopPropagation()}>
//             <button style={styles.closeBtn} onClick={closeDetail}>✕</button>
            
//             {activeDetail.type === 'request' ? (
//               <>
//                 <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
//                   Blood Request Details
//                   <span style={{ 
//                     fontSize: 14, 
//                     padding: '4px 10px', 
//                     borderRadius: 12, 
//                     background: getStatusColor(activeDetail.item.status),
//                     color: '#fff'
//                   }}>
//                     {activeDetail.item.status?.toUpperCase()}
//                   </span>
//                 </h3>
//                 <div style={styles.modalContent}>
//                   <div style={styles.modalSection}>
//                     <h4>Basic Information</h4>
//                     <div style={styles.modalGrid}>
//                       <div><strong>Blood Group:</strong> {activeDetail.item.bloodGroup}</div>
//                       <div><strong>Urgency:</strong> {activeDetail.item.urgency || 'Medium'}</div>
//                       <div><strong>Location:</strong> {activeDetail.item.location || '—'}</div>
//                       <div><strong>Created:</strong> {new Date(activeDetail.item.createdAt).toLocaleString()}</div>
//                     </div>
//                   </div>

//                   {activeDetail.item.recipient && (
//                     <div style={styles.modalSection}>
//                       <h4>Recipient Details</h4>
//                       <div style={styles.modalGrid}>
//                         <div><strong>Name:</strong> {activeDetail.item.recipient.name}</div>
//                         <div><strong>Email:</strong> {activeDetail.item.recipient.email}</div>
//                         <div><strong>Phone:</strong> {activeDetail.item.recipient.phone || '—'}</div>
//                         <div><strong>Location:</strong> {activeDetail.item.recipient.location || '—'}</div>
//                       </div>
//                     </div>
//                   )}

//                   {activeDetail.item.donor && (
//                     <div style={styles.modalSection}>
//                       <h4>Donor Details</h4>
//                       <div style={styles.modalGrid}>
//                         <div><strong>Name:</strong> {activeDetail.item.donor.name}</div>
//                         <div><strong>Blood Group:</strong> {activeDetail.item.donor.bloodGroup}</div>
//                         <div><strong>Email:</strong> {activeDetail.item.donor.email}</div>
//                         <div><strong>Phone:</strong> {activeDetail.item.donor.phone || '—'}</div>
//                       </div>
//                     </div>
//                   )}

//                   {activeDetail.item.notes && (
//                     <div style={styles.modalSection}>
//                       <h4>Additional Notes</h4>
//                       <p style={{ margin: '8px 0 0' }}>{activeDetail.item.notes}</p>
//                     </div>
//                   )}
//                 </div>
//               </>
//             ) : (
//               <>
//                 <h3 style={{ marginTop: 0 }}>{activeDetail.item.name}</h3>
//                 <div style={{ marginTop: 8 }}>
//                   <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{JSON.stringify(activeDetail.item, null, 2)}</pre>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const styles = {
//   page: { padding: 24, fontFamily: "Segoe UI, Roboto, Arial, sans-serif" },
//   header: { marginBottom: 18 },
//   title: { margin: 0, fontSize: 28, color: '#223' },
//   subtitle: { margin: '6px 0 14px', color: '#556' },
//   searchWrap: { marginTop: 8 },
//   search: { padding: '10px 12px', width: 360, borderRadius: 8, border: '1px solid #ddd' },
//   section: { marginTop: 22 },
//   sectionTitle: { margin: '6px 0 12px', fontSize: 20, color: '#244' },
//   grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 },
//   card: { background: 'white', borderRadius: 12, padding: 14, boxShadow: '0 6px 18px rgba(20,30,40,0.06)', cursor: 'pointer', transition: 'transform .12s', minHeight: 110 },
//   cardHeader: { display: 'flex', gap: 12, alignItems: 'center' },
//   avatar: { width: 44, height: 44, borderRadius: 10, background: '#e8f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0a57a0' },
//   cardName: { fontSize: 16, fontWeight: 700, color: '#112' },
//   cardSub: { fontSize: 12, color: '#667' },
//   cardBody: { marginTop: 12, fontSize: 13, color: '#334' },
//   infoRow: { marginTop: 6 },
//   modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1200 },
//   modal: { background: 'white', padding: 20, borderRadius: 10, width: 'min(880px, 96%)', maxHeight: '90vh', overflow: 'auto', position: 'relative' },
//   closeBtn: { position: 'absolute', right: 10, top: 10, border: 'none', background: 'transparent', fontSize: 18, cursor: 'pointer' },
//   modalContent: { marginTop: 16 },
//   modalSection: { marginTop: 24, '&:first-child': { marginTop: 0 } },
//   modalGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px 24px', marginTop: 8 },
//   modalSection: { 
//     marginTop: 24,
//     '& h4': { 
//       margin: 0, 
//       fontSize: 16, 
//       color: '#334', 
//       paddingBottom: 6,
//       borderBottom: '1px solid #eee'
//     }
//   }
// };



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Chart components for visual data
const BloodGroupChart = ({ donors, recipients }) => {
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  const donorCounts = bloodGroups.map(bg => 
    donors.filter(d => d.bloodGroup === bg).length
  );
  
  const recipientCounts = bloodGroups.map(bg => 
    recipients.filter(r => r.requiredBloodGroup === bg).length
  );

  const maxCount = Math.max(...donorCounts, ...recipientCounts);

  return (
    <div style={chartStyles.container}>
      <h4 style={chartStyles.title}>Blood Group Distribution</h4>
      <div style={chartStyles.chart}>
        {bloodGroups.map((bg, index) => (
          <div key={bg} style={chartStyles.barGroup}>
            <div style={chartStyles.barContainer}>
              <div 
                style={{
                  ...chartStyles.bar,
                  ...chartStyles.donorBar,
                  height: `${(donorCounts[index] / maxCount) * 100}%`
                }}
                title={`Donors: ${donorCounts[index]}`}
              ></div>
              <div 
                style={{
                  ...chartStyles.bar,
                  ...chartStyles.recipientBar,
                  height: `${(recipientCounts[index] / maxCount) * 100}%`
                }}
                title={`Recipients: ${recipientCounts[index]}`}
              ></div>
            </div>
            <span style={chartStyles.barLabel}>{bg}</span>
          </div>
        ))}
      </div>
      <div style={chartStyles.legend}>
        <div style={chartStyles.legendItem}>
          <div style={{...chartStyles.legendColor, background: '#4CAF50'}}></div>
          <span>Donors</span>
        </div>
        <div style={chartStyles.legendItem}>
          <div style={{...chartStyles.legendColor, background: '#FF6B6B'}}></div>
          <span>Recipients</span>
        </div>
      </div>
    </div>
  );
};

const StatusChart = ({ requests }) => {
  const statuses = [
    { label: 'Pending', value: 'pending', color: '#FFD700' },
    { label: 'Matched', value: 'matched', color: '#4CAF50' },
    { label: 'Completed', value: 'completed', color: '#2196F3' },
    { label: 'Cancelled', value: 'cancelled', color: '#F44336' }
  ];

  const statusCounts = statuses.map(status => 
    requests.filter(req => req.status?.toLowerCase() === status.value).length
  );

  const total = statusCounts.reduce((sum, count) => sum + count, 0);

  return (
    <div style={chartStyles.container}>
      <h4 style={chartStyles.title}>Request Status</h4>
      <div style={chartStyles.pieChart}>
        {statusCounts.map((count, index) => {
          if (count === 0) return null;
          const percentage = (count / total) * 100;
          return (
            <div
              key={statuses[index].value}
              style={{
                ...chartStyles.pieSegment,
                background: statuses[index].color,
                transform: `rotate(${statusCounts.slice(0, index).reduce((sum, c) => sum + (c/total)*360, 0)}deg)`,
                clipPath: `conic-gradient(transparent 0%, transparent ${percentage}%, ${statuses[index].color} ${percentage}%)`
              }}
              title={`${statuses[index].label}: ${count} (${percentage.toFixed(1)}%)`}
            ></div>
          );
        })}
      </div>
      <div style={chartStyles.legend}>
        {statuses.map((status, index) => (
          statusCounts[index] > 0 && (
            <div key={status.value} style={chartStyles.legendItem}>
              <div style={{...chartStyles.legendColor, background: status.color}}></div>
              <span>{status.label}: {statusCounts[index]}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'pending': return '#ffd700';
    case 'matched': return '#4caf50';
    case 'completed': return '#2196f3';
    case 'cancelled': return '#f44336';
    default: return '#9e9e9e';
  }
};

export default function AdminDashboard() {
  const [donors, setDonors] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [bloodRequests, setBloodRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDetail, setActiveDetail] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const stored = (() => {
          try { return JSON.parse(localStorage.getItem('userInfo') || 'null'); } catch { return null; }
        })();
        const token = stored?.token || localStorage.getItem('adminToken') || null;
        const opts = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

        const [donorsRes, recipsRes, requestsRes] = await Promise.all([
          axios.get('http://localhost:8000/api/admin/donors', opts),
          axios.get('http://localhost:8000/api/admin/recipients', opts),
          axios.get('http://localhost:8000/api/requests/allrqt', opts),
        ]);

        setDonors(donorsRes.data || []);
        setRecipients(recipsRes.data || []);
        setBloodRequests(requestsRes.data || []);
        setError(null);
      } catch (err) {
        console.error('Failed to load admin data', err?.response || err);
        setError(err?.response?.data?.message || err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const filtered = (list) => {
    if (!search) return list;
    const s = search.toLowerCase();
    return list.filter(i => 
      (i.name || '').toLowerCase().includes(s) || 
      (i.email || '').toLowerCase().includes(s) || 
      (i.location || '').toLowerCase().includes(s)
    );
  };

  const openDetail = (type, item) => setActiveDetail({ type, item });
  const closeDetail = () => setActiveDetail(null);

  if (loading) return (
    <div style={styles.loadingContainer}>
      <div style={styles.loadingSpinner}></div>
      <p style={styles.loadingText}>Loading Admin Dashboard...</p>
    </div>
  );
  
  if (error) return (
    <div style={styles.errorContainer}>
      <div style={styles.errorIcon}>⚠️</div>
      <h3 style={styles.errorTitle}>Unable to Load Data</h3>
      <p style={styles.errorText}>{error}</p>
      <button style={styles.retryButton} onClick={() => window.location.reload()}>
        Retry
      </button>
    </div>
  );

  return (
    <div style={styles.page}>
      {/* Header Section */}
      <header style={styles.header} data-aos="fade-down">
        <div style={styles.headerContent}>
          <div>
            <h1 style={styles.title}>Admin Dashboard</h1>
            <p style={styles.subtitle}>Comprehensive overview of blood donation system</p>
          </div>
          <div style={styles.statsOverview}>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{donors.length}</div>
              <div style={styles.statLabel}>Total Donors</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{recipients.length}</div>
              <div style={styles.statLabel}>Total Recipients</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{bloodRequests.length}</div>
              <div style={styles.statLabel}>Blood Requests</div>
            </div>
          </div>
        </div>
        
        <div style={styles.searchWrap}>
          <div style={styles.searchContainer}>
            <span style={styles.searchIcon}>🔍</span>
            <input 
              placeholder="Search by name, email, or location..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              style={styles.search} 
            />
          </div>
        </div>
      </header>

      {/* Charts Section */}
      <section style={styles.chartsSection} data-aos="fade-up">
        <div style={styles.chartGrid}>
          <div style={styles.chartCard}>
            <BloodGroupChart donors={donors} recipients={recipients} />
          </div>
          <div style={styles.chartCard}>
            <StatusChart requests={bloodRequests} />
          </div>
        </div>
      </section>

      {/* Donors Section */}
      <section style={styles.section} data-aos="fade-up">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            Blood Donors
            <span style={styles.countBadge}>{filtered(donors).length}</span>
          </h2>
          <div style={styles.sectionActions}>
            <button style={styles.exportButton}>Export Data</button>
          </div>
        </div>
        <div style={styles.grid}>
          {filtered(donors).map(d => (
            <div key={d._id} style={styles.card} onClick={() => openDetail('donor', d)}>
              <div style={styles.cardHeader}>
                <div style={{...styles.avatar, background: '#e8f4fd'}}>
                  {d.name?.[0]?.toUpperCase() || 'D'}
                </div>
                <div style={styles.cardHeaderText}>
                  <div style={styles.cardName}>{d.name}</div>
                  <div style={styles.cardSub}>{d.bloodGroup || 'N/A'} • {d.location || '—'}</div>
                </div>
              </div>
              <div style={styles.cardBody}>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Email:</span>
                  <span style={styles.infoValue}>{d.email}</span>
                </div>
                {d.phone && (
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Phone:</span>
                    <span style={styles.infoValue}>{d.phone}</span>
                  </div>
                )}
                <div style={styles.cardFooter}>
                  <span style={styles.availabilityTag}>Available</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recipients Section */}
      <section style={styles.section} data-aos="fade-up">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            Blood Recipients
            <span style={styles.countBadge}>{filtered(recipients).length}</span>
          </h2>
        </div>
        <div style={styles.grid}>
          {filtered(recipients).map(r => (
            <div key={r._id} style={styles.card} onClick={() => openDetail('recipient', r)}>
              <div style={styles.cardHeader}>
                <div style={{...styles.avatar, background: '#ffe8e8'}}>
                  {r.name?.[0]?.toUpperCase() || 'R'}
                </div>
                <div style={styles.cardHeaderText}>
                  <div style={styles.cardName}>{r.name}</div>
                  <div style={styles.cardSub}>{r.requiredBloodGroup || 'N/A'} • {r.location || '—'}</div>
                </div>
              </div>
              <div style={styles.cardBody}>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Email:</span>
                  <span style={styles.infoValue}>{r.email}</span>
                </div>
                {r.phone && (
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Phone:</span>
                    <span style={styles.infoValue}>{r.phone}</span>
                  </div>
                )}
                <div style={styles.cardFooter}>
                  <span style={{
                    ...styles.urgencyTag,
                    background: r.urgency === 'High' ? '#ff4444' : 
                               r.urgency === 'Low' ? '#4CAF50' : '#ff9800'
                  }}>
                    {r.urgency || 'Medium'} Urgency
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blood Requests Section */}
      <section style={styles.section} data-aos="fade-up">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            Blood Requests
            <span style={styles.countBadge}>{filtered(bloodRequests).length}</span>
          </h2>
        </div>
        <div style={styles.grid}>
          {filtered(bloodRequests).map(req => (
            <div key={req._id} style={styles.card} onClick={() => openDetail('request', req)}>
              <div style={styles.cardHeader}>
                <div style={{
                  ...styles.avatar,
                  background: getStatusColor(req.status),
                  color: 'white'
                }}>
                  {req.status?.[0]?.toUpperCase() || 'P'}
                </div>
                <div style={styles.cardHeaderText}>
                  <div style={styles.cardName}>
                    {req.bloodGroup} Required
                  </div>
                  <div style={styles.cardSub}>
                    {req.recipient?.name || 'Unknown'} • {req.location || '—'}
                  </div>
                </div>
              </div>
              <div style={styles.cardBody}>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Status:</span>
                  <span style={{
                    ...styles.statusBadge,
                    color: getStatusColor(req.status)
                  }}>
                    {req.status?.toUpperCase()}
                  </span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Urgency:</span>
                  <span style={styles.infoValue}>{req.urgency || 'Medium'}</span>
                </div>
                {req.donor && (
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Matched Donor:</span>
                    <span style={styles.infoValue}>{req.donor.name}</span>
                  </div>
                )}
                <div style={styles.cardFooter}>
                  <span style={styles.dateText}>
                    {new Date(req.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Modal */}
      {activeDetail && (
        <div style={styles.modalOverlay} onClick={closeDetail}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={closeDetail}>✕</button>
            
            {activeDetail.type === 'request' ? (
              <div style={styles.modalContent}>
                <div style={styles.modalHeader}>
                  <h3 style={styles.modalTitle}>Blood Request Details</h3>
                  <span style={{
                    ...styles.statusPill,
                    background: getStatusColor(activeDetail.item.status)
                  }}>
                    {activeDetail.item.status?.toUpperCase()}
                  </span>
                </div>

                <div style={styles.modalGrid}>
                  <div style={styles.modalSection}>
                    <h4 style={styles.modalSectionTitle}>Request Information</h4>
                    <div style={styles.detailGrid}>
                      <div style={styles.detailItem}>
                        <span style={styles.detailItemLabel}>Blood Group</span>
                        <span style={styles.bloodGroupHighlight}>{activeDetail.item.bloodGroup}</span>
                      </div>
                      <div style={styles.detailItem}>
                        <span style={styles.detailItemLabel}>Urgency Level</span>
                        <span style={styles.urgencyHighlight}>{activeDetail.item.urgency || 'Medium'}</span>
                      </div>
                      <div style={styles.detailItem}>
                        <span style={styles.detailItemLabel}>Location</span>
                        <span>{activeDetail.item.location || 'Not specified'}</span>
                      </div>
                      <div style={styles.detailItem}>
                        <label>Date Created</label>
                        <span>{new Date(activeDetail.item.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {activeDetail.item.recipient && (
                    <div style={styles.modalSection}>
                      <h4 style={styles.modalSectionTitle}>Recipient Information</h4>
                      <div style={styles.detailGrid}>
                        <div style={styles.detailItem}>
                          <label>Name</label>
                          <span>{activeDetail.item.recipient.name}</span>
                        </div>
                        <div style={styles.detailItem}>
                          <label>Email</label>
                          <span>{activeDetail.item.recipient.email}</span>
                        </div>
                        <div style={styles.detailItem}>
                          <label>Phone</label>
                          <span>{activeDetail.item.recipient.phone || 'Not provided'}</span>
                        </div>
                        <div style={styles.detailItem}>
                          <label>Location</label>
                          <span>{activeDetail.item.recipient.location || 'Not specified'}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDetail.item.donor && (
                    <div style={styles.modalSection}>
                      <h4 style={styles.modalSectionTitle}>Matched Donor</h4>
                      <div style={styles.detailGrid}>
                        <div style={styles.detailItem}>
                          <label>Name</label>
                          <span>{activeDetail.item.donor.name}</span>
                        </div>
                        <div style={styles.detailItem}>
                          <label>Blood Group</label>
                          <span>{activeDetail.item.donor.bloodGroup}</span>
                        </div>
                        <div style={styles.detailItem}>
                          <label>Email</label>
                          <span>{activeDetail.item.donor.email}</span>
                        </div>
                        <div style={styles.detailItem}>
                          <label>Contact</label>
                          <span>{activeDetail.item.donor.phone || 'Not provided'}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {activeDetail.item.notes && (
                  <div style={styles.modalSection}>
                    <h4 style={styles.modalSectionTitle}>Additional Notes</h4>
                    <div style={styles.notesBox}>
                      {activeDetail.item.notes}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={styles.modalContent}>
                <div style={styles.modalHeader}>
                  <h3 style={styles.modalTitle}>
                    {activeDetail.type === 'donor' ? 'Donor' : 'Recipient'} Details
                  </h3>
                </div>
                <div style={styles.detailGrid}>
                  {Object.entries(activeDetail.item).map(([key, value]) => (
                    <div key={key} style={styles.detailItem}>
                      <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                      <span>{String(value || '—')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Enhanced styles for professional appearance
const styles = {
  page: { 
    padding: '24px', 
    fontFamily: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
    background: '#f8fafc',
    minHeight: '100vh'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: '#f8fafc'
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #e2e8f0',
    borderTop: '4px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  loadingText: {
    marginTop: '16px',
    color: '#64748b',
    fontSize: '16px'
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: '#f8fafc',
    textAlign: 'center'
  },
  errorIcon: {
    fontSize: '48px',
    marginBottom: '16px'
  },
  errorTitle: {
    color: '#dc2626',
    marginBottom: '8px'
  },
  errorText: {
    color: '#64748b',
    marginBottom: '24px'
  },
  retryButton: {
    padding: '10px 24px',
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  header: {
    marginBottom: '32px'
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px'
  },
  title: { 
    margin: 0, 
    fontSize: '32px', 
    color: '#1e293b',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  subtitle: { 
    margin: '8px 0 0', 
    color: '#64748b',
    fontSize: '16px'
  },
  statsOverview: {
    display: 'flex',
    gap: '16px'
  },
  statCard: {
    background: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    minWidth: '120px'
  },
  statNumber: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '4px'
  },
  statLabel: {
    fontSize: '12px',
    color: '#64748b',
    fontWeight: '500'
  },
  searchWrap: {
    marginTop: '8px'
  },
  searchContainer: {
    position: 'relative',
    display: 'inline-block'
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#64748b'
  },
  search: { 
    padding: '12px 12px 12px 40px', 
    width: '400px', 
    borderRadius: '10px', 
    border: '2px solid #e2e8f0',
    background: 'white',
    fontSize: '14px',
    transition: 'all 0.2s',
    ':focus': {
      outline: 'none',
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    }
  },
  chartsSection: {
    marginBottom: '32px'
  },
  chartGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px'
  },
  chartCard: {
    background: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  section: { 
    marginTop: '32px' 
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  sectionTitle: { 
    margin: 0, 
    fontSize: '24px', 
    color: '#1e293b',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  countBadge: {
    background: '#3b82f6',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500'
  },
  sectionActions: {
    display: 'flex',
    gap: '12px'
  },
  exportButton: {
    padding: '8px 16px',
    background: 'transparent',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    color: '#374151',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      background: '#f9fafb'
    }
  },
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
    gap: '20px' 
  },
  card: { 
    background: 'white', 
    borderRadius: '12px', 
    padding: '20px', 
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer', 
    transition: 'all 0.3s ease',
    border: '1px solid #f1f5f9',
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      borderColor: '#3b82f6'
    }
  },
  cardHeader: { 
    display: 'flex', 
    gap: '16px', 
    alignItems: 'center',
    marginBottom: '16px'
  },
  avatar: { 
    width: '48px', 
    height: '48px', 
    borderRadius: '12px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    fontWeight: '600', 
    fontSize: '16px',
    flexShrink: 0
  },
  cardHeaderText: {
    flex: 1,
    minWidth: 0
  },
  cardName: { 
    fontSize: '18px', 
    fontWeight: '600', 
    color: '#1e293b',
    marginBottom: '4px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  cardSub: { 
    fontSize: '14px', 
    color: '#64748b',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  cardBody: {
    marginTop: '16px'
  },
  infoRow: { 
    marginBottom: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  infoLabel: {
    fontSize: '13px',
    color: '#64748b',
    fontWeight: '500'
  },
  infoValue: {
    fontSize: '13px',
    color: '#1e293b',
    fontWeight: '400'
  },
  cardFooter: {
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid #f1f5f9',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  availabilityTag: {
    background: '#dcfce7',
    color: '#166534',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500'
  },
  urgencyTag: {
    color: 'white',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500'
  },
  statusBadge: {
    fontSize: '12px',
    fontWeight: '600',
    padding: '4px 8px',
    borderRadius: '6px',
    background: 'rgba(0,0,0,0.05)'
  },
  dateText: {
    fontSize: '12px',
    color: '#64748b'
  },
  modalOverlay: { 
    position: 'fixed', 
    inset: 0, 
    background: 'rgba(0,0,0,0.5)', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    zIndex: 1200,
    padding: '20px'
  },
  modal: { 
    background: 'white', 
    padding: '32px', 
    borderRadius: '16px', 
    width: 'min(900px, 100%)', 
    maxHeight: '90vh', 
    overflow: 'auto', 
    position: 'relative',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  },
  closeBtn: { 
    position: 'absolute', 
    right: '20px', 
    top: '20px', 
    border: 'none', 
    background: 'transparent', 
    fontSize: '20px', 
    cursor: 'pointer',
    color: '#64748b',
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    ':hover': {
      background: '#f1f5f9',
      color: '#1e293b'
    }
  },
  modalContent: {
    marginTop: '8px'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px'
  },
  modalTitle: {
    margin: 0,
    fontSize: '24px',
    color: '#1e293b',
    fontWeight: '600'
  },
  statusPill: {
    padding: '6px 16px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '12px',
    fontWeight: '600'
  },
  modalGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  modalSection: {
    marginBottom: '8px'
  },
  modalSectionTitle: {
    margin: '0 0 16px 0',
    fontSize: '18px',
    color: '#1e293b',
    fontWeight: '600',
    paddingBottom: '8px',
    borderBottom: '2px solid #f1f5f9'
  },
  detailGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px'
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  detailItemLabel: {
    fontSize: '12px',
    color: '#64748b',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  detailItemValue: {
    fontSize: '14px',
    color: '#1e293b',
    fontWeight: '400'
  },
  bloodGroupHighlight: {
    background: '#3b82f6',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '14px'
  },
  urgencyHighlight: {
    background: '#f59e0b',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '14px'
  },
  notesBox: {
    background: '#f8fafc',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#475569'
  }
};

// Chart styles
const chartStyles = {
  container: {
    width: '100%'
  },
  title: {
    margin: '0 0 20px 0',
    fontSize: '16px',
    color: '#1e293b',
    fontWeight: '600',
    textAlign: 'center'
  },
  chart: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: '200px',
    marginBottom: '20px',
    padding: '0 20px'
  },
  barGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  },
  barContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '4px',
    height: '160px'
  },
  bar: {
    width: '16px',
    borderRadius: '4px 4px 0 0',
    transition: 'height 0.3s ease',
    minHeight: '4px'
  },
  donorBar: {
    background: '#4CAF50'
  },
  recipientBar: {
    background: '#FF6B6B'
  },
  barLabel: {
    fontSize: '12px',
    color: '#64748b',
    fontWeight: '500'
  },
  pieChart: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    margin: '0 auto 20px',
    position: 'relative',
    background: '#e2e8f0',
    overflow: 'hidden'
  },
  pieSegment: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)'
  },
  legend: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: '#64748b'
  },
  legendColor: {
    width: '12px',
    height: '12px',
    borderRadius: '2px'
  }
};

// Add CSS animation for spinner
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(spinnerStyle);