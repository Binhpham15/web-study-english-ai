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
