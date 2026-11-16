import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { CartProvider, useCart } from "./CartContext";
import { classicMatryoshka, taigaHoney } from "@/test/fixtures";

const wrapper = ({ children }: { children: ReactNode }) => <CartProvider>{children}</CartProvider>;

describe("CartContext", () => {
  it("starts with an empty cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it("merges quantities when the same product is added twice", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(classicMatryoshka));
    act(() => result.current.addItem(classicMatryoshka, 2));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(3);
  });

  it("calculates totals across different products", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(classicMatryoshka, 2);
      result.current.addItem(taigaHoney, 1);
    });
    expect(result.current.totalItems).toBe(3);
    expect(result.current.totalPrice).toBe(102.5);
  });

  it("removes an item when its quantity is set to zero", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(classicMatryoshka));
    act(() => result.current.changeQty(classicMatryoshka.id, 0));
    expect(result.current.items).toEqual([]);
  });

  it("restores the cart from localStorage after a reload", () => {
    const first = renderHook(() => useCart(), { wrapper });
    act(() => first.result.current.addItem(taigaHoney, 4));
    first.unmount();

    const second = renderHook(() => useCart(), { wrapper });
    expect(second.result.current.items[0].product.id).toBe(taigaHoney.id);
    expect(second.result.current.totalItems).toBe(4);
  });
});
