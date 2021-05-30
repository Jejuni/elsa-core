import {Component, h, Prop, getAssetPath} from '@stencil/core';

@Component({
  tag: 'elsa-studio-root',
  shadow: false,
  assetsDirs: ['assets']
})
export class ElsaStudioRoot {

  @Prop({attribute: 'server-url', reflect: true}) serverUrl: string;
  @Prop({attribute: 'monaco-lib-path', reflect: true}) monacoLibPath: string;

  render() {

    const serverUrl = this.serverUrl;
    const monacoLibPath = this.monacoLibPath;
    const logoPath = getAssetPath('./assets/logo.png');

    // TODO: Tunneling doesn't appear to be working in combination with the router.
    // const tunnelState: DashboardState = {
    //   serverUrl: serverUrl,
    // };

    return (
      <div class="h-screen bg-gray-100">
        <nav class="bg-gray-800">
          <div class="px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <img class="h-8 w-8" src={logoPath} alt="Workflow"/>
                </div>
                <div class="hidden md:block">
                  <div class="ml-10 flex items-baseline space-x-4">
                    <stencil-route-link url="/workflow-definitions" anchorClass="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" activeClass="text-white bg-gray-900">Workflow Definitions
                    </stencil-route-link>
                    <stencil-route-link url="/workflow-instances" anchorClass="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" activeClass="text-white bg-gray-900">Workflow Instances
                    </stencil-route-link>
                    <stencil-route-link url="/workflow-registry" anchorClass="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" activeClass="text-white bg-gray-900">Workflow Registry
                    </stencil-route-link>
<<<<<<< Updated upstream
                    {/*<stencil-route-link url="/custom-activities" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Custom Activities</stencil-route-link>*/}
=======
                    <stencil-route-link url="/webhook-definitions" anchorClass="elsa-text-gray-300 hover:elsa-bg-gray-700 hover:elsa-text-white elsa-px-3 elsa-py-2 elsa-rounded-md elsa-text-sm elsa-font-medium" activeClass="elsa-text-white elsa-bg-gray-900">Webhook Definitions
                    </stencil-route-link>                    
                    {/*<stencil-route-link url="/custom-activities" class="elsa-text-gray-300 hover:elsa-bg-gray-700 hover:elsa-text-white elsa-px-3 elsa-py-2 elsa-rounded-md elsa-text-sm elsa-font-medium">Custom Activities</stencil-route-link>*/}
>>>>>>> Stashed changes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main>
          {/*<Tunnel.Provider state={tunnelState}>*/}
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="elsa-studio-home" exact={true}/>
              <stencil-route url="/workflow-registry" component="elsa-studio-workflow-registry" componentProps={{'serverUrl': serverUrl}} exact={true}/>
              <stencil-route url="/workflow-registry/:id" component="elsa-studio-workflow-blueprint-view" componentProps={{'serverUrl': serverUrl}} />
              <stencil-route url="/workflow-definitions" component="elsa-studio-workflow-definitions-list" componentProps={{'serverUrl': serverUrl}} exact={true}/>
              <stencil-route url="/workflow-definitions/:id" component="elsa-studio-workflow-definitions-edit" componentProps={{'serverUrl': serverUrl, 'monacoLibPath': monacoLibPath}}/>
              <stencil-route url="/workflow-instances" component="elsa-studio-workflow-instances-list" componentProps={{'serverUrl': serverUrl}} exact={true}/>
              <stencil-route url="/workflow-instances/:id" component="elsa-studio-workflow-instances-view" componentProps={{'serverUrl': serverUrl}}/>
              <stencil-route url="/webhook-definitions" component="elsa-studio-webhook-definitions-list" componentProps={{'serverUrl': serverUrl}} exact={true}/>
              <stencil-route url="/webhook-definitions/:id" component="elsa-studio-webhook-definitions-edit" componentProps={{'serverUrl': serverUrl, 'monacoLibPath': monacoLibPath}}/>              
            </stencil-route-switch>
          </stencil-router>
          {/*</Tunnel.Provider>*/}
        </main>
      </div>
    );
  }
}
