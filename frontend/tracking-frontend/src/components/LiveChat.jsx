import React, { useEffect } from "react";

const LiveChat = () => {
  useEffect(() => {
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/678ae808825083258e07097f/1ihr9kp2d';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

  return null; // No visible component
};

export default LiveChat;
