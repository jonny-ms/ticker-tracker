import { useRef, useLayoutEffect } from "react";

// To support server-side rendering and prevent unnecessary bugs, we need to check if the DOM is ready, and the window context exists.
const isBrowser = typeof window !== `undefined`;

function getScrollPosition(element) {
	if (!isBrowser) return { x: 0, y: 0 };

	const target = element ? element.current : document.body;
	const position = target.getBoundingClientRect();

	return { x: position.left, y: position.top };
}

export function useScrollPosition(effect, dependency, element = null) {
	const position = useRef(getScrollPosition());

	const handleScroll = () => {
		const currPos = getScrollPosition(element);
		effect({ prevPos: position.current, currPos });
		position.current = currPos;
	};

	useLayoutEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, dependency);
}
