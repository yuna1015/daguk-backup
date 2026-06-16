# DAGUK TEXTILE — Design System

## Inspiration
Third Dimension headphone site: full-bleed product images on black, editorial dash (—) typography, minimal navigation, annotation-style callout points, bold single-word section headers.

## Colors
- Background: #050505 (near-black)
- Surface: #0d0d0d
- Border/Divider: #1a1a1a
- Text Primary: #f0ede8 (warm white/ivory)
- Text Secondary: #6b6560
- Accent: #c8b89a (warm sand — thread/yarn tone)
- Accent Hover: #e8d8c0

## Typography
- **Display/Hero**: Cormorant Garamond — italic, large, tracked wide (english accent only)
- **Headings & Body (Korean)**: Pretendard — light/regular
- **Labels/Nav**: Pretendard — 11px uppercase letter-spacing 0.15em
- **Editorial Dash**: — prefix on section titles (e.g. "—COMPANY")

## Layout
- Full-bleed sections, 100vh hero
- Edge-to-edge product imagery with text overlaid
- Asymmetric: text left-floated or pinned to corner
- Annotation callout dots with thin lines pointing to product details
- Minimal nav: fixed top, brand left, links right, ultra-thin
- Generous negative space — content breathes
- Horizontal rules as section dividers (1px, #1a1a1a)

## Motion
- Staggered fade-up on scroll entry (Intersection Observer)
- Hero text splits in on load (character by character reveal)
- Product images: subtle scale 1.0→1.03 on scroll parallax
- Nav: transparent on hero, transitions to solid on scroll

## Sections
1. **Hero** — fullscreen machine/knit image, brand name large, sub-copy
2. **—COMPANY** — 회사소개, 1991 설립, 지표 3개 (1991/25+/24h)
3. **—PRODUCTS** — 제품 아카이브 그리드 (립/골지/다이마루)
4. **—CONTACT** — 찾아오는길 지도 + 주소/TEL/FAX/이메일
5. **—PARTNERS** — 파트너사 (추후 추가 플레이스홀더)

## No-nos
- No rounded card borders
- No colorful gradients
- No Inter/Space Grotesk
- No cookie-cutter 3-column card grid
