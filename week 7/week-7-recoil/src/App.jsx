import { useRecoilValue, RecoilRoot } from "recoil";
import { notificationsAtom, totalNotificationSelector } from "./atom";
import React, { Suspense } from "react";
function App() {
  return (
    <div>
      <RecoilRoot>
        <Suspense fallback={<div>Loading...</div>}>
          <MainApp />
        </Suspense>
      </RecoilRoot>
    </div>
  );
}

function MainApp() {
  const NotificationCount = useRecoilValue(notificationsAtom);
  const TotalNotificationCount = useRecoilValue(totalNotificationSelector);
  if (!NotificationCount) return <div>Loading...</div>;
  return (
    <div>
      <button>Home</button>

      <button>My Network {NotificationCount.network}</button>
      <button>Jobs {NotificationCount.jobs}</button>
      <button>Messaging {NotificationCount.messages}</button>
      <button>Notifications {NotificationCount.notification}</button>
      <button>Me {TotalNotificationCount}</button>
    </div>
  );
}

export default App;