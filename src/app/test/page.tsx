export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Tailwind 测试页面</h1>
      <p className="text-gray-700 mb-4">这是一个用于测试 Tailwind CSS 是否正常工作的页面。</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-red-800">红色卡片</h2>
          <p className="text-red-600">这个卡片应该有淡红色背景和红色文字。</p>
        </div>
        
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-800">蓝色卡片</h2>
          <p className="text-blue-600">这个卡片应该有淡蓝色背景和蓝色文字。</p>
        </div>
        
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-green-800">绿色卡片</h2>
          <p className="text-green-600">这个卡片应该有淡绿色背景和绿色文字。</p>
        </div>
        
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-yellow-800">黄色卡片</h2>
          <p className="text-yellow-600">这个卡片应该有淡黄色背景和黄色文字。</p>
        </div>
      </div>
      
      <div className="mt-8 flex space-x-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          蓝色按钮
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          绿色按钮
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          红色按钮
        </button>
      </div>
    </div>
  );
} 