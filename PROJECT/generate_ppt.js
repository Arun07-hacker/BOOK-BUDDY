const PptxGenJS = require('pptxgenjs');

async function buildDeck() {
  const pptx = new PptxGenJS();

  
  pptx.layout = 'LAYOUT_16x9';

  const primary = '2F5597';
  const accent = '6FA8DC';
  const dark = '1F2A44';
  const light = 'FFFFFF';
  const gray = '666666';

  
  const titleOpts = { x: 0.5, y: 0.6, w: 9, h: 1, fontSize: 36, bold: true, color: dark };
  const subtitleOpts = { x: 0.5, y: 1.6, w: 9, h: 1, fontSize: 18, color: gray };
  const sectionTitle = { x: 0.5, y: 0.4, w: 9, h: 0.8, fontSize: 28, bold: true, color: dark };
  const bullets = { x: 0.7, y: 1.2, w: 9, fontSize: 18, color: dark, bullet: true, lineSpacing: 24 };

  
  let slide = pptx.addSlide();
  slide.background = { color: light };
  slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.2, fill: primary });
  slide.addText('BookBuddy Hotel Management System', { x: 0.5, y: 0.25, w: 9, h: 0.8, fontSize: 32, bold: true, color: light, align: 'left' });
  slide.addText('Backend: Node.js + Express + PostgreSQL | Frontend: HTML/CSS/JS', titleOpts);
  slide.addText('Author: Your Name | Date: ' + new Date().toLocaleDateString(), subtitleOpts);

 
  slide = pptx.addSlide();
  slide.addText('Objectives', sectionTitle);
  slide.addText([
    { text: 'Streamline hotel, room, and booking management', options: {} },
    { text: 'Role-based access (Customer, Staff, Manager)', options: {} },
    { text: 'Food menu and orders integrated with bookings', options: {} },
    { text: 'Secure payments and receipts (Razorpay/Stripe ready)', options: {} },
    { text: 'Dashboards for Admin/Manager; staff task tracking', options: {} },
  ], bullets);

  
  slide = pptx.addSlide();
  slide.addText('Architecture Overview', sectionTitle);
  slide.addText([
    { text: 'Frontend: Static HTML/CSS/JS pages (dbms project/)', options: {} },
    { text: 'Backend: Node.js + Express REST API (backend/)', options: {} },
    { text: 'Database: PostgreSQL with SQL schema and seed data', options: {} },
    { text: 'Base URL: /api/v1 | Health: /health', options: {} },
    { text: 'Sequelize ORM, JWT auth, validation, rate limiting', options: {} },
  ], bullets);

  
  slide = pptx.addSlide();
  slide.addText('Tech Stack & Security', sectionTitle);
  slide.addText([
    { text: 'Node.js, Express, Sequelize', options: {} },
    { text: 'PostgreSQL | Multer + Cloudinary | Nodemailer', options: {} },
    { text: 'Payments: Razorpay, Stripe (endpoints prepared)', options: {} },
    { text: 'Security: Helmet, CORS, Rate limiting, Validation', options: {} },
    { text: 'Logging/Dev: Morgan, Compression', options: {} },
  ], bullets);

  
  slide = pptx.addSlide();
  slide.addText('Core Features', sectionTitle);
  slide.addText([
    { text: 'Users: register/login/profile; roles & JWT auth', options: {} },
    { text: 'Hotels/Rooms: CRUD, availability, pricing', options: {} },
    { text: 'Bookings: reservations, cancellations, reviews', options: {} },
    { text: 'Food: menu, categories, popular, search, orders', options: {} },
    { text: 'Staff: tasks and attendance; Manager/Admin ops', options: {} },
  ], bullets);


  slide = pptx.addSlide();
  slide.addText('Database Schema (Overview)', sectionTitle);
  slide.addText([
    { text: 'Main entities: user, hotel, room_type, room, booking, food_item, food_order, order_detail, assigned_task, facility, hotel_facility', options: {} },
    { text: 'Composite keys: room(room_number, hotel_id); order_detail(order_id, food_item_id)', options: {} },
    { text: 'Indexes on email, role, names, dates to improve performance', options: {} },
  ], bullets);

  
  slide = pptx.addSlide();
  slide.addText('ER Diagram', sectionTitle);
  const boxW = 2.8, boxH = 0.9;
  function box(x, y, title) {
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y, w: boxW, h: boxH, fill: { color: 'F3F6FB' }, line: { color: primary, width: 1.5 }, shadow: { type: 'outer' }
    });
    slide.addText(title, { x: x+0.15, y: y+0.2, w: boxW-0.3, h: boxH-0.4, fontSize: 14, color: dark, bold: true });
  }
  function conn(x1, y1, x2, y2) {
    slide.addShape(pptx.shapes.LINE, { x: x1, y: y1, w: x2-x1, h: y2-y1, line: { color: gray, width: 1.5 } });
  }

  const yTop = 1.3, yMid = 2.6, yBot = 4.0, yBot2 = 5.3;
  box(0.5, yTop, 'user');
  box(3.6, yTop, 'hotel');
  box(6.7, yTop, 'facility');

  box(3.6, yMid, 'room');
  box(0.5, yMid, 'room_type');
  box(6.7, yMid, 'hotel_facility');

  box(0.5, yBot, 'booking');
  box(3.6, yBot, 'food_order');
  box(6.7, yBot, 'food_item');

  box(3.6, yBot2, 'order_detail');
  box(0.5, yBot2, 'assigned_task');

  
  conn(1.9, yTop+boxH, 1.9, yBot+0.0); 
  conn(4.95, yTop+boxH, 4.95, yMid+0.0); 
  conn(1.9, yMid+boxH, 3.6+boxW/2, yMid+0.0); 
  conn(4.95, yMid+boxH, 4.95, yBot+0.0);
  conn(1.9, yBot+boxH, 3.6+boxW/2, yBot+0.0); 
  conn(5.0, yBot+boxH, 5.0, yBot2+0.0); 
  conn(8.1, yBot+boxH, 8.1, yBot2+0.0); 
  conn(8.1, yTop+boxH, 8.1, yMid+0.0); 
  conn(5.0, yTop+boxH, 8.1, yMid+0.0); 
  conn(1.9, yTop+boxH, 1.9, yBot2+0.0); 

  
  slide.addText('Note: Lines indicate FK relationships; some are composite keys.', { x: 0.5, y: 6.2, w: 9, h: 0.4, fontSize: 12, color: gray });

  
  slide = pptx.addSlide();
  slide.addText('Database Logic & Triggers', sectionTitle);
  slide.addText([
    { text: 'Booking totals: calculate total_nights and grand_total', options: {} },
    { text: 'Prevent double-booking: overlap check on booking dates', options: {} },
    { text: "Update room status: set 'Occupied' after booking", options: {} },
    { text: 'Order detail subtotal: price × quantity', options: {} },
    { text: 'Assigned task validation: only Staff/Manager', options: {} },
  ], bullets);

 
  slide = pptx.addSlide();
  slide.addText('Setup & Deployment', sectionTitle);
  slide.addText([
    { text: 'Environment: .env (PORT, DB_*, JWT_*, email, Cloudinary, payment keys)', options: {} },
    { text: 'Run: npm install && npm run dev (backend)', options: {} },
    { text: 'Docker/PM2 options available for production', options: {} },
    { text: 'Seed data: hotels, rooms, food items; users via registration', options: {} },
  ], bullets);

  
  
  const fileName = 'BookBuddy_Project_Presentation.pptx';
  await pptx.writeFile({ fileName });
  console.log('PPT generated:', fileName);
}

buildDeck().catch((e) => {
  console.error('Failed to generate PPT:', e);
  process.exit(1);
});
