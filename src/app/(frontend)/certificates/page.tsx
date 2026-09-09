import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { NoMatch } from "../_components/not-match";
import { CertificatesView } from "../_components/certificates-view";
import { getAttendantByCode, getAttendantTrainings } from "@/app/(frontend)/_server/data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function CertificatesSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="rounded-lg gap-0">
            <CardContent className="gap-3 pt-5">
              <Skeleton className="size-10 rounded-full mb-1" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
            <CardFooter className="gap-2 pt-4">
              <Skeleton className="h-9 flex-1" />
              <Skeleton className="h-9 w-9" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default async function CertificatesPage() {
  const cookieStore = await cookies();
  const code = cookieStore.get("attendant_code")?.value;
  if (!code) redirect("/verify");

  const attendant = await getAttendantByCode(code);
  if (!attendant) return <NoMatch />;

  const response = getAttendantTrainings(attendant.id);
  return (
    <Suspense fallback={<CertificatesSkeleton />}>
      <CertificatesView attendant={attendant} certificatesResponse={response} />
    </Suspense>
  );
}