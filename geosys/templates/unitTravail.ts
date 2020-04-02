

export const uniteTravail:string = `
<div ng-controller="WorkUnit as ctrl14">
    <div ng-style="ctrl1.SelectedMenuUT" class="Geosys-div-Button-Uti" ng-click="ctrl1.ShowHideUT()">
        <h2>{{ 'plugins.geosys.unit' | translate }}</h2>
    </div>
    <div ng-show="ctrl1.IsVisibleUT" ng-style="ctrl1.bgEnv" class="Geosys-extractspace">
        <form name="utform">
            <md-input-container>
                <label>Query to add a working zone in the map</label>
                <textarea type="text" style="height: 30px; width: 354px;" name="text" ng-model="ctrl14.query" required></textarea>
                <md-button class="md-raised md-primary Geosys-btnShape" style="margin-top:15px;" ng-click="ctrl14.addGeom()" ng-disabled="utform.text.$invalid">Add</md-button>
            </md-input-container>
        </form>
        <div>
        </div>
        
    </div>
<div>
`