import React from 'react';

const Footer = () => {
  return (
    <footer style={{ background: '#1f1f1f', color: '#fff', padding: '40px 20px', marginTop: 50 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'space-between' }}>
        {/* Cột 1: Kết nối */}
        <div>
          <h4>KẾT NỐI</h4>
          <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" width={24} alt="Facebook" />
            <img src="https://cdn-icons-png.flaticon.com/512/3670/3670051.png" width={24} alt="Zalo" />
            <img src="https://cdn-icons-png.flaticon.com/512/733/733646.png" width={24} alt="YouTube" />
            <img src="https://cdn-icons-png.flaticon.com/512/3046/3046120.png" width={24} alt="TikTok" />
          </div>
          <p style={{ marginTop: 15 }}>Tư vấn: <b>1800.6601</b></p>
          <p>Hỗ trợ: <b>1800.6601 (nhánh 2)</b></p>
        </div>

        {/* Cột 2: Về chúng tôi */}
        <div>
          <h4>VỀ CHÚNG TÔI</h4>
          <ul style={ulStyle}>
            <li>Giới thiệu</li>
            <li>Tin tức</li>
            <li>Đại lý</li>
            <li>Liên hệ</li>
          </ul>
        </div>

        {/* Cột 3: Chính sách */}
        <div>
          <h4>CHÍNH SÁCH</h4>
          <ul style={ulStyle}>
            <li>Bảo hành</li>
            <li>Đổi trả</li>
            <li>Giao hàng</li>
            <li>Bảo mật</li>
          </ul>
        </div>

        {/* Cột 4: Thanh toán */}
        <div>
          <h4>THANH TOÁN</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" width={40} alt="Visa" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" width={40} alt="Mastercard" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/Momo_Logo.png" width={40} alt="Momo" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/ZaloPay-logo.svg" width={40} alt="ZaloPay" />
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 30, borderTop: '1px solid #444', paddingTop: 15 }}>
        <p>© {new Date().getFullYear()} iPhone Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

const ulStyle = {
  listStyle: 'none',
  padding: 0,
  marginTop: 10,
  lineHeight: '1.8',
  fontSize: 14,
  color: '#ccc',
};

export default Footer;
