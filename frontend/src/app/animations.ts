import { trigger, transition, style, animate, query, stagger, keyframes, state } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-10px)' }),
    animate('400ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
  ]),
  transition(':leave', [
    animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 0, transform: 'translateY(-10px)' }))
  ])
]);

export const slideUp = trigger('slideUp', [
  transition(':enter', [
    style({ 
      transform: 'translateY(50px) scale(0.9)', 
      opacity: 0 
    }),
    animate('500ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ 
      transform: 'translateY(0) scale(1)', 
      opacity: 1 
    }))
  ]),
  transition(':leave', [
    animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({ 
      transform: 'translateY(50px) scale(0.9)', 
      opacity: 0 
    }))
  ])
]);

export const slideIn = trigger('slideIn', [
  transition(':enter', [
    style({ transform: 'translateX(-30px) rotateY(-15deg)', opacity: 0 }),
    animate('400ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ 
      transform: 'translateX(0) rotateY(0deg)', 
      opacity: 1 
    }))
  ])
]);

export const staggerSlideIn = trigger('staggerSlideIn', [
  transition('* => *', [
    query(':enter', [
      style({ transform: 'translateX(-30px)', opacity: 0 }),
      stagger('50ms', [
        animate('400ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ 
          transform: 'translateX(0)', 
          opacity: 1 
        }))
      ])
    ], { optional: true })
  ])
]);

export const bounceIn = trigger('bounceIn', [
  transition(':enter', [
    animate('600ms cubic-bezier(0.68, -0.55, 0.265, 1.55)', keyframes([
      style({ transform: 'scale(0)', opacity: 0, offset: 0 }),
      style({ transform: 'scale(1.2)', opacity: 1, offset: 0.5 }),
      style({ transform: 'scale(1)', opacity: 1, offset: 1 })
    ]))
  ])
]);

export const pulse = trigger('pulse', [
  state('normal', style({ transform: 'scale(1)' })),
  state('pulse', style({ transform: 'scale(1.05)' })),
  transition('normal => pulse', [
    animate('200ms ease-in-out')
  ]),
  transition('pulse => normal', [
    animate('200ms ease-in-out')
  ])
]);

export const shake = trigger('shake', [
  transition('* => shake', [
    animate('500ms', keyframes([
      style({ transform: 'translateX(0)', offset: 0 }),
      style({ transform: 'translateX(-10px)', offset: 0.1 }),
      style({ transform: 'translateX(10px)', offset: 0.2 }),
      style({ transform: 'translateX(-10px)', offset: 0.3 }),
      style({ transform: 'translateX(10px)', offset: 0.4 }),
      style({ transform: 'translateX(-10px)', offset: 0.5 }),
      style({ transform: 'translateX(10px)', offset: 0.6 }),
      style({ transform: 'translateX(-10px)', offset: 0.7 }),
      style({ transform: 'translateX(10px)', offset: 0.8 }),
      style({ transform: 'translateX(-10px)', offset: 0.9 }),
      style({ transform: 'translateX(0)', offset: 1 })
    ]))
  ])
]);

export const fadeInScale = trigger('fadeInScale', [
  transition(':enter', [
    style({ 
      opacity: 0, 
      transform: 'scale(0.8)',
      filter: 'blur(10px)'
    }),
    animate('500ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ 
      opacity: 1, 
      transform: 'scale(1)',
      filter: 'blur(0px)'
    }))
  ])
]);

export const rotateIn = trigger('rotateIn', [
  transition(':enter', [
    style({ 
      transform: 'rotate(-180deg) scale(0)',
      opacity: 0
    }),
    animate('600ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ 
      transform: 'rotate(0deg) scale(1)',
      opacity: 1
    }))
  ])
]);

export const slideDown = trigger('slideDown', [
  transition(':enter', [
    style({ 
      transform: 'translateY(-30px)',
      opacity: 0
    }),
    animate('400ms cubic-bezier(0.4, 0, 0.2, 1)', style({ 
      transform: 'translateY(0)',
      opacity: 1
    }))
  ]),
  transition(':leave', [
    animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({ 
      transform: 'translateY(-30px)',
      opacity: 0
    }))
  ])
]);

export const scaleIn = trigger('scaleIn', [
  transition(':enter', [
    style({ 
      transform: 'scale(0)',
      opacity: 0
    }),
    animate('400ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ 
      transform: 'scale(1)',
      opacity: 1
    }))
  ])
]);

