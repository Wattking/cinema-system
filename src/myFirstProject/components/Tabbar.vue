<template>
    <div class="tabbar-container">
        <ul class="tabbar">
            <li>
                <router-link to="/films" active-class="active">
                    <span class="icon">🎬</span>
                    <span class="text">电影</span>
                </router-link>
            </li>
            <li>
                <router-link to="/cinemas" active-class="active">
                    <span class="icon">🏪</span>
                    <span class="text">影院</span>
                </router-link>
            </li>
            <li>
                <router-link to="/center" active-class="active">
                    <span class="icon">👤</span>
                    <span class="text">我的</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
.tabbar-container {
    z-index: 10000;
}

.tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    display: flex;
    align-items: center;
    background: white;
    box-shadow: 0 -2px 15px rgba(0, 0, 0, 0.08);
    border-top: 1px solid #f0f0f0;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
        flex: 1;
        height: 100%;
        transition: all 0.3s ease;

        &:hover {
            background-color: #f8f8f8;
        }

        a {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            text-decoration: none;
            color: #666;
            position: relative;
            transition: all 0.3s ease;

            .icon {
                font-size: 20px;
                margin-bottom: 4px;
            }

            .text {
                font-size: 12px;
                font-weight: 500;
            }

            &.active {
                color: #ff5f5f;

                .icon {
                    transform: translateY(-3px);
                }

                &::after {
                    content: '';
                    position: absolute;
                    bottom: 5px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 20px;
                    height: 3px;
                    background: #ff5f5f;
                    border-radius: 3px;
                }
            }
        }
    }
}
</style>