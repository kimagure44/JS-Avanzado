var store = new Vuex.Store({
    state: {
        showMap: null,
        titleModalMap: null
    },
    mutations: {
        setShowMap: function(state, value) {
            state.showMap = value;
        },
        setTitleModalMap: function(state, value) {
            state.titleModalMap = value;
        }
    },
    getters: {
        getShowMap: function(state) {
            return state.showMap;
        },
        getTitleModalMap: function(state) {
            return state.titleModalMap;
        }
    },
    actions: {

    }
});
var vue = new Vue({
    store: store,
    el: "#container",
    components: {
        "modal-mapa": httpVueLoader("modal-mapa.vue"),
        "loading-data": httpVueLoader("loading.vue")
    },
    data: {
        resultado: null,
        contenido: "",
        nombre: "",
        showLoading: null,
        busqueda: "",
        selectFiltro: [],
        selectFiltroBusqueda: "",
        totalRegistros: null
    },
    created: function() {
        this.$store.commit("setShowMap", false);
        this.loadJSON();
        this.loading(true);
    },
    mounted: function() {

    },
    methods: {
        verMapa: function(_lat, _lng, _info) {
            debugger;
            var _center = {
                lat: parseFloat(_lat),
                lng: parseFloat(_lng)
            };
            var infowindow = new google.maps.InfoWindow({
                content: _info["$"]
            });
            var _map = new google.maps.Map(document.getElementById('containerMapa'), {
                zoom: 15,
                center: _center
            });
            var _marker = new google.maps.Marker({
                position: _center,
                map: _map
            });
            _marker.addListener('click', function() {
                infowindow.open(_map, _marker);
            });
            this.$store.commit("setTitleModalMap", _info["$"]);
            this.$store.commit("setShowMap", true);
        },
        convertDate: function(fecha) {
            return fecha.split(" ")[0].split("-")[2] + "-" + fecha.split(" ")[0].split("-")[1] + "-" + fecha.split(" ")[0].split("-")[0]; // + " " + fecha.split(" ")[1];
        },
        filtroTecladoCSS: function() {
            var _sel = selectFiltroBusqueda.selectedOptions;
            var showCard = document.querySelectorAll("[data-atributo*='" + _sel[0].innerText + "|" + this.busqueda + "']");
            var card = document.querySelectorAll(".card");
            for (var cont = 0, len = card.length; cont < len; cont++) {
                card[cont].classList.remove("show");
                card[cont].classList.add("hide");
            }
            if (this.busqueda.length > 0) {
                for (var cont = 0, len = showCard.length; cont < len; cont++) {
                    document.getElementById(showCard[cont].getAttribute("data-id")).classList.remove("hide");
                    document.getElementById(showCard[cont].getAttribute("data-id")).classList.add("show");
                }
            } else {
                for (var cont = 0, len = card.length; cont < len; cont++) {
                    card[cont].classList.remove("hide");
                    card[cont].classList.add("show");
                }
            }

        },
        loading: function(estado) {
            if (estado) {
                this.showLoading = true;
            } else {
                this.showLoading = false;
            }
        },
        loadJSON: function() {
            axios.get("downloadFile.php").then((response) => {
                debugger;
                this.resultado = response.data;
                this.nombre = this.resultado.Contenidos.infoDataset.nombre;
                this.contenido = this.resultado.Contenidos.contenido;
                this.populateSelectFiltro();
                this.loading(false);
                this.totalRegistros = this.contenido.length;
            });
        },
        populateSelectFiltro: function() {
            var _select = Object.getOwnPropertyDescriptors(this.contenido[0].atributos.atributo);
            this.selectFiltro.push("---");
            for (s in _select)
                if (typeof _select[s].value["@nombre"] !== "undefined" && _select[s].value["@nombre"] !== "ID-EVENTO") {
                    this.selectFiltro.push(_select[s].value["@nombre"]);
                }


            selectFiltroBusqueda = document.getElementById("selectFiltroBusqueda");
        }
    }
});