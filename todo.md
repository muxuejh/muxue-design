1. 将颜色透明度调为0时，比如 #B31E1E00，重新设置，颜色颜色选择器中的颜色会重置为 #FF000000，这是因为当颜色透明度为0时把颜色设置成了 '' 。最好不设置为 ''，这样在重新设置颜色时颜色选择器中会显示之前的颜色（#B31E1E00），而不是初始的 #FF000000。