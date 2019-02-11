class Colors {
  constructor() {
    this.index = 0;
    this.colors = [
      '#e53935',
      '#1e88e5',
      '#8e24aa',
      '#00897b',
      '#fb8c00',
      '#43a047',
      '#6d4c41',
      '#00acc1',
    ];
  }

  nextColor() {
    const color = this.colors[this.index];
    this.index++;
    if (this.index >= this.colors.length) {
      this.index = 0;
    }
    return color;
  }
}

export default Colors;
