# Dekd Frontend Intern Challenge

![image](https://github.com/inspirezuza/dekd_frontend_intern_challenge/assets/102022496/96a38ca0-e798-4076-acff-fd5606cab194)

**Deploy:** https://dekd-frontend-intern-challenge.vercel.app/

**โจทย์:** https://vintage-painter-228.notion.site/Frontend-Quiz-Dev-9466837540634c4094dcc6f5ef7c4b4f

**Figma:** https://www.figma.com/file/QMVNPA4ODcvGQ8663JwTVx/Quiz%3A-Frontend?type=design&node-id=2-2364&mode=design&t=srCdOgm31LtL0WBg-0

## Requirement
- ผู้ใช้งานสามารถ สร้าง / แก้ไข / ลบ รายการนิยายที่คั่นไว้ได้
- แสดงรายการแบนเนอร์นิยายมาใหม่
- รองรับการแสดงผลบน Web Responsive

## ระบบที่เพิ่มเติมจาก Requirement
- มีการปรับแต่ง ui บางส่วนเพื่อความสวยงาม
- ทำการเชื่อมต่อกับ mockapi.io ในการเพิ่มและลบที่คั่น
- เพิ่มปุ่มในการเพิ่มที่คั่น
- ป้องกันการ spam ด้วยการใส่ delay ไว้
- เพิ่ม loading, sucess และ error toast จาก react hot toast
- เพิ่มหน้าสำหรับนิยายแต่ละเรื่องคร่าวๆ
- เพิ่มหน้าสำหรับนักเขียนแต่ละคนคร่าวๆ
- เพิ่ม alert dialog สำหรับการกดลบที่คั่นที่เลือกไว้ 

## Technology ที่ใช้
- Nextjs
- Shadcn/ui

## Web service ที่ใช้
- mockapi.io
- placehold.co

## วิธีการติดตั้ง
1. Clone the repository:
```sh
git clone https://github.com/inspirezuza/dekd_frontend_intern_challenge.git
```

2. Install the dependencies
```sh
npm i
   ```

3. Start the development server
```sh
npm run dev
   ```

4. Open http://localhost:3000 with your browser to see the result.

## Project Structure
- src/app/page.tsx: หน้าหลัก 
- src/components: เก็บ components
- src/components/CarouselPlugin.tsx: ส่วนของ Banner ด้านบนของตัวเว็บ
- src/components/NovelSection.tsx: ส่วนทั้งหมดของ grid นิยาย
- src/components/AddBookMarkButton.tsx: ส่วนทั้งหมดของปุ่มเพิ่มที่คั่นใหม่ 
- src/lib: เก็บ script ต่างๆ
## License

[MIT](https://choosealicense.com/licenses/mit/)

