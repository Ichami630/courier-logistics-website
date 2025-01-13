import Card from "../../components/admincomponents/Card";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <Card title="Total Users" value="1,234" />
      <Card title="Revenue" value="$12,345" />
      <Card title="Active Sessions" value="56" />
    </div>
  );
};

export default Dashboard;
