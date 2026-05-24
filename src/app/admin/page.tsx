import AdminDashboard from "@/components/AdminDashboard";

export const metadata = {
  title: "Admin | Hanuman Chalisa Mahabhiyan",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="py-16 px-4">
      <div className="text-center mb-10">
        <h1 className="font-spiritual text-2xl text-divine-gold tracking-wider">
          Admin Dashboard
        </h1>
        <p className="text-amber-200/50 text-sm mt-2">Authorized access only</p>
      </div>
      <AdminDashboard />
    </div>
  );
}
