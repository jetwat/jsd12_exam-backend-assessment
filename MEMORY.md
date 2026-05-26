# สรุปการเรียนรู้ Session Express.js

## คำถามและปัญหาที่พบ

1.  **บั๊กใน `app.delete()`:**
    *   `splice()` ใช้งานผิดวิธี: ส่ง `products[index]` (Object หรือ `undefined`) แทนที่จะเป็น `index` (ตัวเลข)
    *   ผลลัพธ์: ลบ `products[0]` เสมอเมื่อหา ID ไม่เจอ เนื่องจาก `products.indexOf(undefined)` ได้ `-1`, `products[-1]` ได้ `undefined`, และ `splice(undefined, 1)` ถูกตีความเป็น `splice(0, 1)`

2.  **`find()` เทียบกับ `findIndex()`:**
    *   `find()` คืนค่า `Object` ถ้าเจอ, `undefined` ถ้าไม่เจอ
    *   `findIndex()` คืนค่า `index` (ตัวเลข) ถ้าเจอ, `-1` ถ้าไม่เจอ

3.  **ความหมายของ "Query String":**
    *   คือเงื่อนไขเพิ่มเติมใน URL (หลังเครื่องหมาย `?`) เพื่อ Filter หรือ Sort ข้อมูล
    *   เข้าถึงได้ผ่าน `req.query` (เช่น `req.query.name`)

4.  **"Middleware Chain" คืออะไร:**
    *   ลำดับของฟังก์ชันที่ Request ต้องวิ่งผ่านตั้งแต่เข้าสู่ Express จนได้ Response
    *   `app.use(express.json())` คือ Global Middleware ที่ทุก Request ต้องผ่าน
    *   Route Handlers (`app.get`, `app.post` ฯลฯ) ก็เป็นส่วนหนึ่งของ Chain

5.  **ความแตกต่างระหว่าง `res.send()` กับ `next()`:**
    *   `res.send()` (หรือ `res.json()`, `res.status()`) คือการ **"จบการทำงาน"** ของ Request-Response Cycle ใน Middleware/Controller นั้นๆ
    *   `next()` คือการ **"ส่งไม้ต่อ"** ให้ Middleware หรือ Route Handler ตัวถัดไปใน Chain ทำงานต่อ

6.  **การทำงานเมื่อไม่มี URL & Method ใน `app.use()`:**
    *   `app.use(fn)`: Middleware นี้จะถูกเรียกสำหรับ **ทุก Request ทุก Method** ไม่มีการข้าม
    *   `app.use('/path', fn)`: Middleware นี้จะถูกเรียกสำหรับ **ทุก Request ทุก Method ที่ขึ้นต้นด้วย `/path`**
    *   `app.get('/path', fn)`: Middleware นี้จะถูกเรียกสำหรับ Request ที่ **ตรงทั้ง Method (GET) และ Path (`/path`) เท่านั้น**

7.  **`app.listen()` เป็น Middleware หรือไม่ และรันซ้ำไหม:**
    *   **ไม่**ใช่ Middleware
    *   `app.listen()` ทำหน้าที่ **เปิดเซิร์ฟเวอร์** และ **รันเพียงครั้งเดียว** ตอนสตาร์ท `node index.js`
    *   มันอยู่นอก Request-Response Cycle

8.  **"Controller" คืออะไร:**
    *   คือฟังก์ชันที่จัดการ Logic หลักของ Route นั้นๆ (รับ Request, ประมวลผล, ส่ง Response)
    *   มักจะจบด้วยการส่ง `res` เพื่อตอบกลับ Client
    *   เป็นส่วนที่แยกออกมาจาก Routing เพื่อให้โค้ดสะอาดขึ้น (ตามแนวคิด MVC)

9.  **ความแตกต่างระหว่าง `next()` กับ `next(err)`:**
    *   `next()`: ส่ง Request ไปยัง **Middleware/Route Handler ตัวถัดไปแบบปกติ**
    *   `next(err)`: ส่งสัญญาณว่า **เกิด Error** ขึ้น และจะ **ข้าม** Middleware/Route Handler ปกติที่เหลือทั้งหมด ไปยัง **Error Handling Middleware (ฟังก์ชันที่มี 4 arguments: `(err, req, res, next)`)** ตัวแรกที่เจอ

## สิ่งที่ได้เรียนรู้ใหม่

*   ทำความเข้าใจกลไกของ `Array.prototype.splice()` และ `Array.prototype.indexOf()` เมื่อค่าที่ส่งเข้าไปเป็น `undefined` หรือติดลบ และผลกระทบต่อ Logic
*   เรียนรู้วิธีการใช้ `Array.prototype.findIndex()` เพื่อค้นหา `index` ของ Object ใน Array ที่ถูกต้อง
*   เข้าใจแนวคิดและการใช้งาน Query String (`req.query`) เพื่อเพิ่มความยืดหยุ่นในการกรองข้อมูล
*   ลงลึกในแนวคิด "Middleware Chain" ของ Express และลำดับการทำงาน
*   ความชัดเจนในการใช้ `res.send()` เพื่อจบ Request และ `next()` เพื่อส่งต่อ
*   แยกแยะบทบาทของ `app.use()` และ `app.get()` ในการสร้าง Middleware และ Route Handler
*   เข้าใจว่า `app.listen()` คือส่วนของการเริ่มต้นเซิร์ฟเวอร์ ไม่ใช่ Middleware และทำงานแค่ครั้งเดียว
*   แยกแยะหน้าที่ของ Controller ในบริบทของ Express และวิธีแยก Logic ออกมาเป็นฟังก์ชันเฉพาะ
*   เข้าใจความสำคัญและกลไกของ `next(err)` สำหรับการจัดการ Error แบบรวมศูนย์ใน Express เพื่อให้โค้ดมีความทนทานมากขึ้น