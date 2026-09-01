// src/app/(main)/dashboard/page.tsx
import { PageContainer } from "@/components/shared/PageContainer";

export default function DashboardPage() {
  return (
    <PageContainer>
      <h1 className="font-heading text-2xl font-semibold text-foreground">
        Tổng quan
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Chào mừng bạn quay lại. Đây là nơi bạn theo dõi tiến độ học tập.
      </p>
    </PageContainer>
  );
}