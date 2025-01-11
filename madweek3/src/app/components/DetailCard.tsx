interface DetailCardProps {
  description: string;
}

export default function DetailCard({ description }: DetailCardProps) {
  return (
    <div className="detail-card p-4 border rounded bg-white shadow-md">
      <h3 className="text-lg font-bold mb-2">Introduction</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}
