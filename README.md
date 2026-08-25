
# Web Study English AI

Nền tảng học tiếng Anh tích hợp AI, hỗ trợ học từ vựng, ôn tập theo lịch cá nhân hoá, trợ lý hỏi đáp và nhận diện hình ảnh.

Dự án được xây dựng bởi nhóm sinh viên trong khuôn khổ đồ án môn học.

## Trạng thái dự án

 **Đang trong giai đoạn xây dựng.**

Repo hiện đang hoàn thiện thiết lập ban đầu. Các thành phần Docker, CI/CD, cơ sở dữ liệu, dịch vụ AI và triển khai sẽ được cập nhật theo tiến độ dự án.

## Công nghệ sử dụng

| Thành phần | Công nghệ |
|---|---|
| Backend | Node.js, NestJS, TypeScript |
| Frontend | Next.js, React, TypeScript |
| Cơ sở dữ liệu | PostgreSQL, pgvector |
| AI Service | Python, FastAPI, PyTorch, scikit-learn |
| Container | Docker, Docker Compose |
| CI/CD | GitHub Actions |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |
| AI Deployment | Hugging Face Spaces |

## Chức năng chính

- Quản lý và học từ vựng
- Ôn tập theo lịch cá nhân hoá
- Thống kê tiến độ học tập
- Nhận diện từ vựng qua hình ảnh
- Trợ lý hỏi đáp tiếng Anh
- Xác thực và phân quyền người dùng

## Cấu trúc thư mục

> Cấu trúc hiện tại đang được hoàn thiện và có thể thay đổi trong quá trình phát triển.

```text
web-study-english-ai/
├── backend/
├── frontend/
├── docker/
├── .github/
│   └── workflows/
├── README.md
└── CONTRIBUTING.md
```

## Hướng dẫn cài đặt & chạy dự án

>  Hướng dẫn đầy đủ sẽ được bổ sung sau khi hoàn thiện Docker Compose và môi trường cơ sở dữ liệu.

Dự kiến:

```bash
git clone <repo-url>
cd web-study-english-ai
docker compose up
```

## Quy trình làm việc nhóm

- `main`: nhánh ổn định
- `develop`: nhánh tích hợp
- `feature/*`: nhánh phát triển chức năng
- Không push trực tiếp vào `main` và `develop`.
- Mọi thay đổi phải thông qua Pull Request và được review trước khi merge.

Chi tiết xem tại `CONTRIBUTING.md`.

## Thành viên nhóm

| Vai trò | Phụ trách |
|---|---|
| Project Manager / AI Engineer | Nguyễn Phúc Hiếu |
| Backend Developer | Thạc Duy Anh |
| Frontend Developer | Phạm Văn Tâm |
| Tester / Business Analyst | Trần Quang Phúc |
| DevOps Engineer | Phạm Thái Bình |
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

