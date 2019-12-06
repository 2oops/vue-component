export default {
  functional: true,
  props: {
    row: Object,
    columns: Object,
    index: Number,
    render: Function
  },

  render(h, ctx) {
    const params = {
      row: ctx.props.row,
      column: ctx.props.col,
      index: ctx.props.index
    }

    return ctx.props.render(h, params)
  },
}