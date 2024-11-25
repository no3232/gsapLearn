'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import styles from './ScrubLetter.module.scss';

gsap.registerPlugin(ScrollTrigger);

const letter = `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. **Richard McClintock**, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, 

**consectetur**, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`;

const wrapSpan = (text: string, key: string) => {
  // ** 로 감싸진 텍스트를 찾기 위한 정규식
  const parts = text.split(/(\*\*.*?\*\*)/);

  return parts.map((part, partIndex) => {
    // ** 로 감싸진 텍스트인지 확인
    if (part.startsWith('**') && part.endsWith('**')) {
      // ** 제거하고 글자별로 b 태그로 감싸기
      const innerText = part.slice(2, -2);
      return innerText.split('').map((char, charIndex) => (
        <span
          className={`${key}-inner-text`}
          key={`${key}-bold-${partIndex}-${charIndex}`}
        >
          <b>{char}</b>
        </span>
      ));
    }

    // 일반 텍스트는 기존처럼 span으로 감싸기
    return part.split('').map((char, charIndex) => {
      return (
        <span
          className={`${key}-inner-text`}
          key={`${key}-${partIndex}-${charIndex}`}
        >
          {char}
        </span>
      );
    });
  });
};

const ScrubLetter = () => {
  useGSAP(() => {
    const text = gsap.utils.toArray(`.scrub-letter-inner-text`);
    const boldText = gsap.utils.toArray(`.scrub-letter-inner-text b`);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#scrub-letter-wrapper',
        start: 'top top+=50%', // 시작위치 [컨텐츠], [뷰포트 50%]
        end: 'bottom-=50% bottom-=50%', // 끝위치 [컨텐츠 50%], [뷰포트 50%]
        // markers: true,
        scrub: true,
      },
    });

    tl.to(text, {
      color: 'black',
      stagger: {
        each: 0.1,
        from: 'start',
      },
      duration: 1,
    })
  }, []);
  return (
    <div id='scrub-letter-wrapper' className={styles.textDiv}>
      {wrapSpan(letter, 'scrub-letter')}
    </div>
  );
};

export default ScrubLetter;
