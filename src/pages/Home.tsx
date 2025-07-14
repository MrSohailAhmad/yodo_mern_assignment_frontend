const Home = () => {
  return (
    <main className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-2xl font-bold mb-2">120</div>
          <div className="text-gray-500">Users</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-2xl font-bold mb-2">15</div>
          <div className="text-gray-500">Projects</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-2xl font-bold mb-2">8</div>
          <div className="text-gray-500">Tasks</div>
        </div>
      </div>
    </main>
  );
};

export default Home;
