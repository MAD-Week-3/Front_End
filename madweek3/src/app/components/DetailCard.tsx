interface DetailCardProps {
  introduction: string;
}

export default function DetailCard({ introduction }: DetailCardProps) {
  return (
    <div className="detail-card p-4 border rounded bg-white shadow-md">
      <h3 className="text-lg font-bold mb-2">Introduction</h3>
      <p className="text-gray-700">{introduction}</p>
    </div>
  );
}
