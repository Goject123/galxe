import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  CreditCard, 
  Bell, 
  Home, 
  BarChart3, 
  Calendar,
  X,
  Crown,
  Gift,
  Smartphone,
  MessageSquare,
  Zap
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  membershipType: 'free' | 'premium' | 'pro';
  membershipExpiry?: string;
  barkToken?: string;
  notificationTime?: string;
  notificationMethod?: 'bark' | 'serverchan' | 'ntfy';
  serverchanKey?: string;
  ntfyTopic?: string;
}

interface Modal {
  type: 'membership' | 'redeem' | 'notifications' | null;
  isOpen: boolean;
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [modal, setModal] = useState<Modal>({ type: null, isOpen: false });
  const [user, setUser] = useState<User>({
    id: '1',
    name: '张三',
    email: 'zhangsan@example.com',
    membershipType: 'premium',
    membershipExpiry: '2024-12-31',
    barkToken: '',
    notificationTime: '09:00',
    notificationMethod: 'bark'
  });

  const openModal = (type: Modal['type']) => {
    setModal({ type, isOpen: true });
  };

  const closeModal = () => {
    setModal({ type: null, isOpen: false });
  };

  const handleTabChange = (tab: string) => {
    if (modal.isOpen) return; // 弹窗打开时不允许切换标签
    setActiveTab(tab);
  };

  const handleUpgradeMembership = () => {
    // 升级会员逻辑
    console.log('升级会员');
    closeModal();
  };

  const handleRenewMembership = () => {
    // 续费逻辑
    console.log('续费会员');
  };

  const handleRedeemCode = (code: string) => {
    // 兑换码逻辑
    console.log('兑换码:', code);
    closeModal();
  };

  const handleNotificationSave = (settings: any) => {
    setUser(prev => ({ ...prev, ...settings }));
    closeModal();
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">仪表板</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <BarChart3 className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">今日任务</p>
                <p className="text-2xl font-bold text-gray-800">12</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">已完成</p>
                <p className="text-2xl font-bold text-gray-800">8</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Crown className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">会员状态</p>
                <p className="text-lg font-semibold text-purple-600">
                  {user.membershipType === 'free' ? '免费用户' : 
                   user.membershipType === 'premium' ? '高级会员' : '专业会员'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserCenter = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">用户中心</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-800">个人信息</h3>
              <p className="text-sm text-gray-600">{user.name} - {user.email}</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-800">会员状态</h3>
              <p className="text-sm text-gray-600">
                {user.membershipType === 'free' ? '免费用户' : 
                 user.membershipType === 'premium' ? '高级会员' : '专业会员'}
                {user.membershipExpiry && ` - 到期时间: ${user.membershipExpiry}`}
              </p>
            </div>
            <div className="space-x-2">
              {user.membershipType !== 'free' && (
                <button
                  onClick={handleRenewMembership}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  续费
                </button>
              )}
              <button
                onClick={() => openModal('membership')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {user.membershipType === 'free' ? '开通会员' : '升级会员'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSubscriptionManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">订阅管理</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">当前订阅</h3>
            <p className="text-sm text-gray-600">
              {user.membershipType === 'free' ? '免费版本' : 
               user.membershipType === 'premium' ? '高级会员' : '专业会员'}
            </p>
            {user.membershipExpiry && (
              <p className="text-sm text-gray-500">到期时间: {user.membershipExpiry}</p>
            )}
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">兑换码</h3>
            <p className="text-sm text-gray-600 mb-3">使用兑换码获取会员权益</p>
            <button
              onClick={() => openModal('redeem')}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              使用兑换码
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">通知设置</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-800 mb-3">通知方式</h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 border rounded-lg">
                <input
                  type="radio"
                  id="bark"
                  name="notification"
                  value="bark"
                  checked={user.notificationMethod === 'bark'}
                  onChange={(e) => setUser(prev => ({ ...prev, notificationMethod: e.target.value as any }))}
                  className="mr-3"
                />
                <Smartphone className="w-5 h-5 text-blue-600 mr-2" />
                <div className="flex-1">
                  <label htmlFor="bark" className="font-medium text-gray-800">Bark</label>
                  <p className="text-sm text-gray-600">推荐苹果用户使用，免费，需下载App</p>
                </div>
              </div>

              <div className="flex items-center p-3 border rounded-lg">
                <input
                  type="radio"
                  id="serverchan"
                  name="notification"
                  value="serverchan"
                  checked={user.notificationMethod === 'serverchan'}
                  onChange={(e) => setUser(prev => ({ ...prev, notificationMethod: e.target.value as any }))}
                  className="mr-3"
                />
                <MessageSquare className="w-5 h-5 text-green-600 mr-2" />
                <div className="flex-1">
                  <label htmlFor="serverchan" className="font-medium text-gray-800">Server酱</label>
                  <p className="text-sm text-gray-600">微信通知，苹果安卓都可用，付费服务</p>
                </div>
              </div>

              <div className="flex items-center p-3 border rounded-lg">
                <input
                  type="radio"
                  id="ntfy"
                  name="notification"
                  value="ntfy"
                  checked={user.notificationMethod === 'ntfy'}
                  onChange={(e) => setUser(prev => ({ ...prev, notificationMethod: e.target.value as any }))}
                  className="mr-3"
                />
                <Zap className="w-5 h-5 text-purple-600 mr-2" />
                <div className="flex-1">
                  <label htmlFor="ntfy" className="font-medium text-gray-800">ntfy</label>
                  <p className="text-sm text-gray-600">推荐安卓用户，免费，需从Google Play下载</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-800 mb-3">通知时间</h3>
            <input
              type="time"
              value={user.notificationTime}
              onChange={(e) => setUser(prev => ({ ...prev, notificationTime: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {user.notificationMethod === 'bark' && (
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Bark Token</h3>
              <input
                type="text"
                value={user.barkToken || ''}
                onChange={(e) => setUser(prev => ({ ...prev, barkToken: e.target.value }))}
                placeholder="请输入Bark Token"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          {user.notificationMethod === 'serverchan' && (
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Server酱 Key</h3>
              <input
                type="text"
                value={user.serverchanKey || ''}
                onChange={(e) => setUser(prev => ({ ...prev, serverchanKey: e.target.value }))}
                placeholder="请输入Server酱Key"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          {user.notificationMethod === 'ntfy' && (
            <div>
              <h3 className="font-medium text-gray-800 mb-3">ntfy Topic</h3>
              <input
                type="text"
                value={user.ntfyTopic || ''}
                onChange={(e) => setUser(prev => ({ ...prev, ntfyTopic: e.target.value }))}
                placeholder="请输入ntfy主题"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          <button
            onClick={() => handleNotificationSave(user)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            保存设置
          </button>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">系统设置</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-800">基本设置</h3>
            <p className="text-sm text-gray-600">配置系统基本参数</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderModal = () => {
    if (!modal.isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {modal.type === 'membership' && '会员服务'}
              {modal.type === 'redeem' && '兑换码'}
              {modal.type === 'notifications' && '通知设置'}
            </h3>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600 ml-auto"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {modal.type === 'membership' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">高级会员</h4>
                      <p className="text-sm text-gray-600">¥29/月</p>
                    </div>
                    <Crown className="w-6 h-6 text-yellow-500" />
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">专业会员</h4>
                      <p className="text-sm text-gray-600">¥99/月</p>
                    </div>
                    <Crown className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleUpgradeMembership}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  确认升级
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
              </div>
            </div>
          )}

          {modal.type === 'redeem' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  兑换码
                </label>
                <input
                  type="text"
                  placeholder="请输入兑换码"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleRedeemCode('test-code')}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  兑换
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'user':
        return renderUserCenter();
      case 'subscription':
        return renderSubscriptionManagement();
      case 'notifications':
        return renderNotificationSettings();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">Alphaping</h1>
            </div>
            <div className="flex items-center space-x-8">
              <button
                onClick={() => handleTabChange('dashboard')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'dashboard'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                } ${modal.isOpen ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                <Home className="w-4 h-4 mr-2" />
                仪表板
              </button>
              <button
                onClick={() => handleTabChange('user')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'user'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                } ${modal.isOpen ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                <User className="w-4 h-4 mr-2" />
                用户中心
              </button>
              <button
                onClick={() => handleTabChange('subscription')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'subscription'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                } ${modal.isOpen ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                订阅管理
              </button>
              <button
                onClick={() => handleTabChange('notifications')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'notifications'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                } ${modal.isOpen ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                <Bell className="w-4 h-4 mr-2" />
                通知设置
              </button>
              <button
                onClick={() => handleTabChange('settings')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'settings'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                } ${modal.isOpen ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                <Settings className="w-4 h-4 mr-2" />
                系统设置
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>

      {/* 弹窗 */}
      {renderModal()}
    </div>
  );
}

export default App;