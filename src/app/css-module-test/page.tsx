import styles from './page.module.css';

export default function CssModuleTestPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>CSS Module 测试页面</h1>
      <p className={styles.paragraph}>
        这个页面使用 CSS Module 而不是 Tailwind CSS。如果这个页面的样式正确显示，
        但 Tailwind 页面没有，那么问题可能是 Tailwind 的配置或加载有问题。
      </p>

      <div className={styles.card}>
        <h2 className={styles.heading}>测试卡片</h2>
        <p className={styles.paragraph}>这个卡片使用 CSS Module。它应该有灰色背景和圆角。</p>
        <button className={styles.button}>测试按钮</button>
      </div>
    </div>
  );
} 