export const FactCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-primary flex items-center space-x-4">
    <div className="text-primary flex-shrink-0">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-primary">{value}</p>
    </div>
  </div>
);