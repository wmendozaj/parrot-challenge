import '@testing-library/jest-dom';

Object.defineProperty(window, 'location', {
  value: {
    href: '',
    assign: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    origin: 'http://localhost',
  },
  writable: true,
});

export {};
