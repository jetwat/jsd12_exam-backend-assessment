# My Understanding

## Submission Links

**Loom Video (must be set to public — anyone with the link):**
[paste your Loom video URL here]

---

## Questions

Answer each question in your own words. There are no trick questions.

The goal is not a perfect answer — it is an honest one. Write as if you are explaining to a friend who has never used Express. Completing this will prepare you for your video walkthrough.

Do not copy from documentation, your code comments, or AI output. If you are unsure about something, write what you do understand and note where the gap is.

---

**1. What does each HTTP method in your API mean — GET, POST, PUT or PATCH, and DELETE? Why do we use different methods instead of just using POST for everything?**

*Your answer:* 
    
    - GET: คือเรียกดูข้อมูล ไม่ได้ทำการแก้ไข
    - POST: คือการสร้างข้อมูลชุดใหม่ หรือ document ใหม่
    - PATCH: คือการแก้ไข document ที่มีอยู่ แต่ไม่ต้องครบทุกค่า ต่างจาก PUT ที่ควรส่งไปให้ครบทุกค่า
    - DELETE: คือการลบ document ออกจาก database

    เท่าที่เข้าใจ ทางเทคนิคคือจะใช้ POST ทั้งหมดได้ แต่มันจะไม่สื่อความหมาย (not semantic) การที่แยกตามหน้าที่ช่วยให้พัฒนาต่อได้ง่าย ไม่งง อ่านง่าย นอกจากนี้เท่าที่ศึกษามา เหมือนจะมีเรื่องความปลอดภัยที่ส่งผลต่อการตัดสินใจของ browser ด้วย

---

**2. What is `express.json()` and what would happen if you left it out?**

*Your answer:* 
    
    - req.body จะเป็น undefined จากประสบการณ์เขียนสดล่าสุด กว่าจะหาเจอ 555
    - `express.json()` คือ built in middle ware ของ express ทำหน้าที่แปลงข้อความที่ frontend ส่งมาที่ server ซึ่งปกติจะเป็น json ถ้าไม่ทำการแปลง server จะเห็นเป็นแค่ text แทนที่จะเป็น object

---

**3. What is the difference between `req.body`, `req.params`, and `req.query`? Give a real example from your API for each one.**

*Your answer:*

    - `req.body` เอาไว้เรียกดูค่า body ที่ส่งมา
        - ส่งแนบมากับเนื้อหาของ request
    - `req.params` เอาไว้เรียกดูค่าที่มาพร้อมกับ URL ที่เป็น placeholder เช่น `${baseUrl}/:id` อย่างนี้ เราจะได้ค่าที่ user ใส่มา หลังจากท่อน `${baseUrl}/`
        - ส่งมากับ path ใน url
    - `req.query` เเอาไว้เรียกดูค่าที่มาพร้อมกับ URL ที่เป็น query โดยจะจับจาก `?`, `&`, และ `=` เช่น `${baseUrl}/?name=/^Win/i` ก็จะได้ค่า `{ "name": "/^Win/i" }` ออกมา (ใช้ `&` ถ้าอยากได้หลายค่า)
        - ส่งมากับ path ใน url
---

**4. What are HTTP status codes? List every status code you used in your API and explain why you chose it for that situation.**

*Your answer:* 

    คือ สัญญาณมาตรฐานที่ server ส่งกลับไปบอก frontend เพื่อแจ้งสถานะว่าคำขอสำเร็จหรือพบข้อผิดพลาด 2xx (สำเร็จ), 4xx (ฝั่งหน้าบ้านผิดพลาด), 5xx (พังจากหลังบ้าน)
    ถ้าเราใช้โค้ดให้ถูก ฝั่งหน้าบ้านจะทำงานง่ายขึ้น ไม่ต้องอ่านข้อความข้างในอย่างละเอียด 

    - ใช้ 200 เมื่อ คำขอโอเคสำเร็จ โดยที่ข้อมูลที่เกี่ยวข้องนั้นมีในเดต้าเบสอยู่
    - ใช้ 201 เมื่อ คำขอโอเคสำเร็จ โดยที่ข้อมูลนั้นเป็นข้อมูลใหม่ เช่น POST
    - ใช้ 400 เมื่อ คำขอที่ส่งมาฟอร์แมตไม่โอเค
    - ใช้ 404 เมื่อ คำขอที่ส่งมาโอเค แต่หาข้อมูลไม่เจอ
    - ใช้ 500 เมื่อ ระบบพัง

---

**5. What is middleware? Describe what it does in your own words and give one example from your code.**

*Your answer:* 

    เท่าที่เข้าใจ หมายถึงฟังก์ชันที่เอาไว้โพรเซสข้อมูล สามารถเข้าถึง Object ของ request และ respond ได้ และมีฟังก์ชัน next ช่วยส่งต่อข้อมูลไป MDW / ERR Handling MDW ถัด ๆ ไป ได้ ซึ่งยังไม่ใช่ปลายทาง หมายความว่ามันจะจัดการข้อมูลและส่งกันต่อไปเป็นทอด ๆ เหมือน ๆ กับโรงงาน คล้าย ๆ aggregate ของ mongodb
    
    - ตัวอย่าง MDW request logger ก็จะทำหน้าที่ลงประวัติการยิงเอพีไอของยูสเซอร์ก่อน ค่อย next ไปหา middleware ถัด ๆ ไป ที่มี path และ method ตรงเงื่อนไข

---

**6. Why does the order of middleware matter in Express? What could go wrong if it were in the wrong order?**

*Your answer:* 

    สำคัญเพราะการทำงานมันไล่จากบนลงล่าง หากเราเอาสิ่งที่ควรทำก่อนไปไว้ที่หลัง ข้อมูลที่ยูสเซอร์ได้รับอาจไม่เป็นไปตามความคาดหวังของเรา เช่น ยังไม่ได้แปลง json เป็น object โค้ดก็จะ error หรือ เอา err handling ไปไว้ด้านบน เวลาโค้ด err ใน controller แล้ว next มันไปไล่หาข้างล่าง ก็ไม่เจอ

---

**7. Walk through what happens on the server, step by step, when a POST request is sent to `/products`.**

*Your answer:* 

    - เมื่อไคลเอนต์ส่ง POST request มาที่ `/products`
        -> `express.json()` แปลง json เป็น js obj
        -> Express วิ่งหา Route ที่ Match ทั้ง Method (POST) และ Path (/products) เมื่อเจอก็จะส่งให้ฟังก์ชัน middleware หรือ controller ทำงาน
        -> function MDW / CRL จะรับข้อมูลจาก req และทำงานตามลอจิกที่วางไว้ ว่าจะเลือกส่ง res หรือ next มาแบบไหนยังไง
        -> จบการทำงานทั้งหมดเมื่อส่ง res ออกมา 


---

**8. What is CRUD? Map each operation to the HTTP method and route you used in your API.**

*Your answer:* 

    คือคำย่อของ 4 ฟังก์ชันพื้นฐานที่ระบบฐานข้อมูลทั่วไปต้องมี (Create, Read, Update, Delete)

    - Create = POST ใช้ที่ `/products` สร้างสินค้าชิ้นใหม่ลง Database
    - Read = GET ใช้ที่ `/`, `/products`, `/products/:id` ดึงข้อมูลสินค้า
    - Update = PATCH ใช้ที่ `/products/:id` แก้ไขข้อมูลสินค้าชิ้นที่ระบุ id
    - Delete = DELETE ใช้ที่ `/products/:id` ลบสินค้าชิ้นที่ระบุ id ออกจากระบบ

---

**9. How does your API respond when something goes wrong — for example, when a product with a given ID does not exist?**

*Your answer:* 

    ระบบของผมจะเช็คว่า products.find() เช็คเทียบด้วย id แล้วได้ค่า ที่เป็น falsy หรือไม่ ถ้าเป็น falsy จะให้ส่งข้อมูลต่อไปที่ err handler พร้อมกับ message ที่สื่อความหมาย เช่นในที่นั้คือ 404 product not found

---

**10. What was the hardest part of building this API and what did you do to get past it?**

*Your answer:* 

    สิ่งที่ยากคือการทำให้ทันเวลาโดยที่อยากจะเข้าใจการทำงานอย่างถ่องแท้ หรือหาจุดผิดพลาดด้วยตัวเองครับ ผ่านมาได้ด้วยการใช้ ai ดีบัคเมื่อเราลองหาเองแล้วเสียเวลามากไประดับหนึ่งแล้ว ซึ่งการทำแบบนี้ช่วยให้เข้าใจจุดผิดพลาดเล็ก ๆ น้อย ขึ้นเยอะครับ
