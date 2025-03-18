export default function InlineTestPage() {
  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    heading: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      color: '#2563eb',
      marginBottom: '1rem',
    },
    paragraph: {
      color: '#374151',
      marginBottom: '1rem',
      lineHeight: '1.5',
    },
    card: {
      backgroundColor: '#f3f4f6',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      marginBottom: '1rem',
    },
    button: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      border: 'none',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>内联样式测试页面</h1>
      <p style={styles.paragraph}>
        这个页面使用内联样式而不是 Tailwind CSS 类。如果这个页面的样式正确显示，
        但 Tailwind 页面没有，那么问题可能是 Tailwind 的配置或加载有问题。
      </p>

      <div style={styles.card}>
        <h2 style={{...styles.heading, fontSize: '1.5rem'}}>测试卡片</h2>
        <p style={styles.paragraph}>这个卡片使用内联样式。它应该有灰色背景和圆角。</p>
        <button style={styles.button}>测试按钮</button>
      </div>
    </div>
  );
} 