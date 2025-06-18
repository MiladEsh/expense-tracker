import { describe, it, expect } from 'vitest';
import { showError } from '../src/ui-helpers.js';

describe('showError', () => {
  it('toont foutmelding in rood', () => {
    const container = document.createElement('div');
    const error = new Error('Testfout');
    showError(container, error);
    const p = container.querySelector('p');
    expect(p).not.toBeNull();
    expect(p.textContent).toBe('Testfout');
    expect(p.style.color).toBe('red');
  });
});