import styles from './SnapScrollTrigger.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

const SnapScrollTrigger = () => {
  useGSAP(() => {
    const panels = gsap.utils.toArray(`.${styles.pannel}`);

    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: `.${styles.wrapper}`,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (panels.length - 1),
          duration: 0.1,
          delay: 0.1,
          ease: 'power1.inOut',
        },
        end: '+=600%',
      },
    });
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={clsx(styles.pannel, styles.blue)}>
          <div>
            <h1>Horizontal snapping sections (simple)</h1>
            <p>
              Scroll vertically to scrub the horizontal animation. It also
              dynamically snaps to the sections in an organic way based on the
              velocity. The snapping occurs based on the natural ending position
              after momentum is applied, not a simplistic "wherever it is when
              the user stops".
            </p>
            <div className='scroll-down'>
              Scroll down<div className='arrow'></div>
            </div>
          </div>
        </div>

        <section className={clsx(styles.pannel, styles.red)}>ONE</section>
        <section className={clsx(styles.pannel, styles.orange)}>TWO</section>
        <section className={clsx(styles.pannel, styles.purple)}>THREE</section>
        <section className={clsx(styles.pannel, styles.green)}>FOUR</section>
        <section className={clsx(styles.pannel, styles.gray)}>FIVE</section>
      </div>
    </div>
  );
};

export default SnapScrollTrigger;
