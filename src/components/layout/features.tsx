import React from 'react';
import { ShineBorder } from '../ui/shine-border';
import Image from 'next/image';
import { skills } from '@/constant';
import { Card, CardContent } from '../ui/card';

const Features = () => {
  return (
    <section className=''>
      <div className='mx-auto flex py-16 px-6 md:px-8 md:py-32 max-w-[90%] flex-col  space-y-8'>
        <div className='text-center space-y-4'>
          <h1 className='text-3xl md:text-4xl font-bold tracking-tight'>
            Crafting{' '}
            <span className='gradient-text font-normal'>End-to-End</span> Web
            Solutions with Modern Tools & Best Practices
          </h1>
          <p className='text-sm md:text-base text-primary max-w-3xl mx-auto'>
            From building performant UIs to deploying secure and scalable
            applications, I specialize in delivering full-stack solutions using
            the MERN stack and the latest industry standards.
          </p>
        </div>
        <Card
          className={
            'w-full p-0 m-0 border bg-background/20 shadow-lg rounded-3xl relative'
          }
        >
          <ShineBorder
            shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']}
            duration={8}
            borderWidth={1}
          />
          <CardContent className={'flex flex-col lg:flex-row items-start p-0'}>
            <div className='w-full lg:max-w-[50%]'>
              <Image
                src={'/images/hero.webp'}
                className='h-full w-full object-cover shadow-lg rounded-3xl lg:rounded-bl-3xl lg:rounded-tl-3xl '
                height={400}
                width={400}
                alt='hero'
                loading='lazy'
              />
            </div>
            <div className='p-4 space-y-6'>
              <h1 className='text-3xl md:text-4xl font-bold tracking-tight'>
                💻 What I Do Best:
              </h1>
              <div className='flex flex-col gap-2'>
                {skills.map((skill) => (
                  <p
                    key={skill.text}
                    className='text-sm md:text-base text-primary flex items-center gap-2'
                  >
                    <span>
                      {typeof skill.icon === 'string' ? (
                        skill.icon
                      ) : (
                        <skill.icon />
                      )}
                    </span>
                    <span>{skill.text}</span>
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Features;
