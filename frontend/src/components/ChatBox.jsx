import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const { userData } = useContext(AuthContext);
  const msgEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const quickReplies = [
    { text: "Health Symptoms", value: "I have health symptoms. Please advise." },
    { text: "Diet & Nutrition", value: "Give me diet and nutrition tips." },
    { text: "Exercise Guidance", value: "Provide exercise recommendations." },
    { text: "Mental Wellness", value: "Share mental health tips." },
    { text: "General Health", value: "Give me general health advice." },
    { text: "Share Image", value: "image_upload", isImage: true }
  ];

  useEffect(() => {
    const getValidUserId = async () => {
      if (userData?.id) {
        setUserId(userData.id);
        return;
      }
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          if (user.id) {
            setUserId(user.id);
            return;
          }
        } catch(e) {}
      }
      setUserId(null);
    };
    getValidUserId();
  }, [userData]);

  useEffect(() => {
    if (isOpen && !sessionId) {
      createSession();
    }
  }, [isOpen, userId]);

  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const createSession = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/chat/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userId ? Number(userId) : null })
      });
      const data = await res.json();
      if (data.success) {
        setSessionId(data.session.id);
        loadHistory(data.session.id);
      }
    } catch (err) {
      console.error('Session error:', err);
    }
  };

  const loadHistory = async (sid) => {
    try {
      const res = await fetch(`http://localhost:5000/api/chat/history/${sid}`);
      const data = await res.json();
      if (data.success && data.messages.length > 0) {
        setMessages(data.messages);
        setShowQuickReplies(false);
      } else {
        setMessages([{
          role: 'assistant',
          content: 'Namaste! Welcome to Swastha Sangai.\n\nI am your professional health assistant. How may I help you with your health concerns today?'
        }]);
        setShowQuickReplies(true);
      }
    } catch (err) {
      console.error('History error:', err);
    }
  };

  const sendMessage = async (messageText) => {
    const userMsg = messageText || input.trim();
    if (!userMsg || !sessionId) return;

    setMessages(prev => [...prev, { role: 'user', content: userMsg, createdAt: new Date() }]);
    setInput('');
    setShowQuickReplies(false);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          sessionId,
          userId: userId ? Number(userId) : null
        })
      });
      const data = await res.json();
      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply, createdAt: new Date() }]);
      }
    } catch (err) {
      console.error('Send error:', err);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    setUploading(true);
    setShowQuickReplies(false);
    
    try {
      const uploadRes = await fetch('http://localhost:5000/api/chat/upload', {
        method: 'POST',
        body: formData
      });
      const uploadData = await uploadRes.json();
      
      if (uploadData.success) {
        setMessages(prev => [...prev, { 
          role: 'user', 
          content: 'Shared a health image',
          imageUrl: uploadData.imageUrl,
          imageName: uploadData.imageName,
          createdAt: new Date()
        }]);
        
        const aiRes = await fetch('http://localhost:5000/api/chat/message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: `I shared a health image. Please provide health advice.`,
            sessionId,
            userId: userId ? Number(userId) : null
          })
        });
        const aiData = await aiRes.json();
        if (aiData.success) {
          setMessages(prev => [...prev, { role: 'assistant', content: aiData.reply, createdAt: new Date() }]);
        }
      }
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleQuickReply = (reply) => {
    if (reply.isImage) {
      fileInputRef.current.click();
    } else {
      sendMessage(reply.value);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      uploadImage(file);
    }
    fileInputRef.current.value = '';
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#2ECC71',
          border: 'none',
          color: 'white',
          fontSize: '28px',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          zIndex: 9999,
        }}
      >
        💬
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '400px',
          height: '600px',
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 9998,
        }}>
          {/* Header */}
          <div style={{
            background: '#2ECC71',
            color: 'white',
            padding: '15px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: 0 }}>Swastha Sangai</h3>
            <p style={{ margin: '5px 0 0', fontSize: '11px', opacity: 0.9 }}>Your Health Companion</p>
            <div style={{ fontSize: '10px', marginTop: '5px' }}>
              <span style={{
                width: '8px',
                height: '8px',
                background: '#fff',
                borderRadius: '50%',
                display: 'inline-block',
                marginRight: '5px'
              }}></span>
              Online
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '15px',
            background: '#f5f5f5',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  maxWidth: '75%',
                  padding: '10px 14px',
                  borderRadius: '15px',
                  background: msg.role === 'user' ? '#2ECC71' : 'white',
                  color: msg.role === 'user' ? 'white' : '#333',
                  fontSize: '14px',
                  whiteSpace: 'pre-wrap'
                }}>
                  {msg.imageUrl && (
                    <img 
                      src={`http://localhost:5000${msg.imageUrl}`}
                      alt="Health"
                      style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '8px', cursor: 'pointer' }}
                      onClick={() => window.open(`http://localhost:5000${msg.imageUrl}`, '_blank')}
                    />
                  )}
                  {msg.content}
                </div>
              </div>
            ))}
            
            {showQuickReplies && messages.length <= 1 && (
              <div style={{ background: 'white', borderRadius: '15px', padding: '15px', marginTop: '5px' }}>
                <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#666' }}>Select an option:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {quickReplies.map((reply, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickReply(reply)}
                      style={{
                        background: '#e0e0e0',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      {reply.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {(loading || uploading) && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ background: 'white', padding: '10px 15px', borderRadius: '15px' }}>
                  Typing...
                </div>
              </div>
            )}
            <div ref={msgEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '15px',
            background: 'white',
            borderTop: '1px solid #ddd'
          }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => fileInputRef.current.click()}
                style={{
                  background: '#e0e0e0',
                  border: 'none',
                  width: '40px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
              >
                📷
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKey}
                placeholder="Type your health question..."
                style={{
                  flex: 1,
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '20px',
                  outline: 'none'
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim()}
                style={{
                  padding: '10px 20px',
                  background: '#2ECC71',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  opacity: !input.trim() ? 0.5 : 1
                }}
              >
                Send
              </button>
            </div>
            <div style={{ fontSize: '10px', color: '#999', textAlign: 'center', marginTop: '8px' }}>
              Click 📷 to share health images
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            style={{ display: 'none' }}
          />
        </div>
      )}
    </>
  );
};

export default ChatBox;